/* Signal Labs | Signal Schedule | schedule/pages/workspace/history.js | v5.1.0 */
const state={items:[],filter:''};
const $=(s)=>document.querySelector(s);
const esc=(v)=>String(v??'').replace(/[&<>"']/g,(c)=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmtDate=(v)=>v?new Date(v).toLocaleString():'';
const dateOnly=(v)=>v?String(v).slice(0,10):'';

document.addEventListener('click',(event)=>{
  const action=event.target.closest('[data-saved-action]');
  if(action){
    if(action.dataset.savedAction==='refresh')load();
    if(action.dataset.savedAction==='open')openInBuilder(action.dataset.id);
    if(action.dataset.savedAction==='publish')publishSchedule(action.dataset.id);
  }
  const copy=event.target.closest('[data-copy-value]');
  if(copy)copyValue(copy.dataset.copyValue,copy);
});
const filter=$('[data-saved-filter]');
if(filter)filter.addEventListener('input',()=>{state.filter=filter.value.trim().toLowerCase();render();});
load();

async function load(){
  setStatus('Loading schedule history…');
  try{
    const res=await fetch('/api/saved-schedules',{headers:{accept:'application/json'}});
    const json=await res.json().catch(()=>({ok:false,data:[],errors:[{message:'API returned non-JSON response.'}]}));
    if(!res.ok||!json.ok){
      state.items=[];render();
      const message=(json.errors||[]).map(e=>e.message).join(' ')||`Request failed with HTTP ${res.status}.`;
      setStatus(`${message} Confirm DATA_MODE=postgres, DATABASE_URL, and that migration 044 has been applied.`);
      return;
    }
    state.items=Array.isArray(json.data)?json.data:[];
    render();
    setStatus(state.items.length?`${state.items.length} snapshot(s) loaded from Postgres.`:'No snapshots found yet. Save a snapshot from the builder.');
  }catch(error){
    state.items=[];render();setStatus(`Unable to reach the snapshot API (/api/saved-schedules). ${error.message}`);
  }
}
function setStatus(text){const el=$('[data-saved-status]');if(el)el.textContent=text;}
function filtered(){
  if(!state.filter)return state.items;
  return state.items.filter(item=>[item.name,item.status,item.agencyId,item.scheduleStartDate,item.scheduleEndDate,item.id].join(' ').toLowerCase().includes(state.filter));
}
function copyButton(value,label='Copy'){
  return `<button type="button" class="saved-mini-btn saved-copy-btn" data-copy-value="${esc(value)}">${esc(label)}</button>`;
}
function render(){
  const tbody=$('[data-saved-table]');if(!tbody)return;
  const rows=filtered();
  tbody.innerHTML=rows.length?rows.map(item=>`<tr data-id="${esc(item.id)}"><td><strong>${esc(item.name)}</strong><br><small>${esc(item.id)}</small> ${copyButton(item.id,'Copy ID')}</td><td>${esc(dateOnly(item.scheduleStartDate))} → ${esc(dateOnly(item.scheduleEndDate))}</td><td><span class="saved-pill saved-pill--${esc(item.status||'draft')}">${esc(item.status||'draft')}</span></td><td>${esc(item.agencyId)} ${copyButton(item.agencyId,'Copy')}</td><td>${esc(fmtDate(item.updatedAt))}</td><td><div class="saved-row-actions"><button type="button" class="saved-mini-btn" data-saved-action="inspect" data-id="${esc(item.id)}">Inspect</button><button type="button" class="saved-mini-btn" data-saved-action="open" data-id="${esc(item.id)}">Restore</button><button type="button" class="saved-mini-btn" data-saved-action="publish" data-id="${esc(item.id)}">Publish</button></div></td></tr>`).join(''):`<tr><td colspan="6">No matching snapshots.</td></tr>`;
  tbody.querySelectorAll('tr[data-id]').forEach(row=>row.addEventListener('click',(event)=>{if(event.target.closest('button'))return;inspect(row.dataset.id);}));
  tbody.querySelectorAll('[data-saved-action="inspect"]').forEach(btn=>btn.addEventListener('click',()=>inspect(btn.dataset.id)));
}
function inspect(id){
  const item=state.items.find(x=>x.id===id);if(!item)return;
  const inspector=$('[data-saved-inspector]');
  const assignments=Array.isArray(item.payload?.assignments)?item.payload.assignments.length:0;
  const endpoint=`/api/saved-schedules/${item.id}`;
  const publishEndpoint=`/api/saved-schedules/${item.id}/publish`;
  const validationJson=JSON.stringify(item.validationSummary||{},null,2);
  inspector.innerHTML=`<div class="saved-detail"><strong>${esc(item.name)}</strong><span>${esc(dateOnly(item.scheduleStartDate))} → ${esc(dateOnly(item.scheduleEndDate))}</span></div><div class="saved-detail"><strong>Snapshot ID</strong><span>${esc(item.id)} ${copyButton(item.id,'Copy ID')}</span></div><div class="saved-detail"><strong>Snapshot Status</strong><span>${esc(item.status)} • ${esc(item.source||'builder')} ${item.publishedAt?'• published '+esc(fmtDate(item.publishedAt)):''}</span></div><div class="saved-detail"><strong>Payload</strong><span>${assignments} assignment row(s)</span></div><div class="saved-detail"><strong>Snapshot API endpoints</strong><span>${esc(endpoint)} ${copyButton(endpoint,'Copy')}</span><span>${esc(publishEndpoint)} ${copyButton(publishEndpoint,'Copy publish')}</span></div><div class="saved-detail"><strong>Validation Summary</strong>${copyButton(validationJson,'Copy JSON')}<pre class="saved-json">${esc(validationJson)}</pre></div>`;
}
async function publishSchedule(id){
  const item=state.items.find(x=>x.id===id);if(!item)return;
  if(item.status==='published'&&!window.confirm('This schedule is already published. Re-apply published state?'))return;
  const adminKey=window.prompt('Enter ADMIN_API_KEY to publish this protected schedule.');
  if(!adminKey){setStatus('Publish cancelled. Protected schedule publish requires ADMIN_API_KEY.');return;}
  setStatus(`Publishing current schedule snapshot ${item.name || id}…`);
  try{
    const res=await fetch(`/api/saved-schedules/${encodeURIComponent(id)}/publish`,{method:'POST',headers:{'content-type':'application/json','x-admin-api-key':adminKey},body:JSON.stringify({publishedBy:'browser-publisher'})});
    const json=await res.json().catch(()=>({ok:false,errors:[{message:'API returned non-JSON response.'}]}));
    if(!res.ok||!json.ok){const message=(json.errors||[]).map(e=>e.message).join(' ')||`HTTP ${res.status}`;setStatus(`Publish failed: ${message}`);return;}
    const index=state.items.findIndex(x=>x.id===id);if(index>=0)state.items[index]=json.data;
    render();inspect(id);setStatus(`Published snapshot: ${json.data.name} (${json.data.id})`);
  }catch(error){setStatus(`Publish failed: ${error.message}`);}
}
function openInBuilder(id){
  const item=state.items.find(x=>x.id===id);if(!item)return;
  localStorage.setItem('signalScheduleBuilderLoad',JSON.stringify(item));
  location.href='builder.html?load=snapshot';
}
async function copyValue(value,button){
  try{
    await navigator.clipboard.writeText(value);
    const old=button.textContent;button.textContent='Copied';setTimeout(()=>button.textContent=old,1200);
  }catch(_error){
    window.prompt('Copy this value:',value);
  }
}
