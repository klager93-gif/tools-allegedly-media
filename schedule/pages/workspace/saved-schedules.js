/* Signal Labs | Signal Schedule | schedule/pages/workspace/saved-schedules.js | v4.5.0 */
const state={items:[],filter:''};
const $=(s)=>document.querySelector(s);
const esc=(v)=>String(v??'').replace(/[&<>"']/g,(c)=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmtDate=(v)=>v?new Date(v).toLocaleString():'';
const dateOnly=(v)=>v?String(v).slice(0,10):'';

document.addEventListener('click',(event)=>{
  const action=event.target.closest('[data-saved-action]');
  if(!action)return;
  if(action.dataset.savedAction==='refresh')load();
  if(action.dataset.savedAction==='open')openInBuilder(action.dataset.id);
});
const filter=$('[data-saved-filter]');
if(filter)filter.addEventListener('input',()=>{state.filter=filter.value.trim().toLowerCase();render();});
load();

async function load(){
  setStatus('Loading saved schedules…');
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
    setStatus(state.items.length?`${state.items.length} saved schedule(s) loaded from Postgres.`:'No saved schedules found yet. Save one from the builder.');
  }catch(error){
    state.items=[];render();setStatus(`Unable to reach /api/saved-schedules. ${error.message}`);
  }
}
function setStatus(text){const el=$('[data-saved-status]');if(el)el.textContent=text;}
function filtered(){
  if(!state.filter)return state.items;
  return state.items.filter(item=>[item.name,item.status,item.agencyId,item.scheduleStartDate,item.scheduleEndDate].join(' ').toLowerCase().includes(state.filter));
}
function render(){
  const tbody=$('[data-saved-table]');if(!tbody)return;
  const rows=filtered();
  tbody.innerHTML=rows.length?rows.map(item=>`<tr data-id="${esc(item.id)}"><td><strong>${esc(item.name)}</strong><br><small>${esc(item.id)}</small></td><td>${esc(dateOnly(item.scheduleStartDate))} → ${esc(dateOnly(item.scheduleEndDate))}</td><td><span class="saved-pill saved-pill--${esc(item.status||'draft')}">${esc(item.status||'draft')}</span></td><td>${esc(item.agencyId)}</td><td>${esc(fmtDate(item.updatedAt))}</td><td><div class="saved-row-actions"><button type="button" class="saved-mini-btn" data-saved-action="inspect" data-id="${esc(item.id)}">Inspect</button><button type="button" class="saved-mini-btn" data-saved-action="open" data-id="${esc(item.id)}">Open in builder</button></div></td></tr>`).join(''):`<tr><td colspan="6">No matching saved schedules.</td></tr>`;
  tbody.querySelectorAll('tr[data-id]').forEach(row=>row.addEventListener('click',(event)=>{if(event.target.closest('button'))return;inspect(row.dataset.id);}));
  tbody.querySelectorAll('[data-saved-action="inspect"]').forEach(btn=>btn.addEventListener('click',()=>inspect(btn.dataset.id)));
}
function inspect(id){
  const item=state.items.find(x=>x.id===id);if(!item)return;
  const inspector=$('[data-saved-inspector]');
  const assignments=Array.isArray(item.payload?.assignments)?item.payload.assignments.length:0;
  inspector.innerHTML=`<div class="saved-detail"><strong>${esc(item.name)}</strong><span>${esc(dateOnly(item.scheduleStartDate))} → ${esc(dateOnly(item.scheduleEndDate))}</span></div><div class="saved-detail"><strong>Status</strong><span>${esc(item.status)} • ${esc(item.source||'builder')}</span></div><div class="saved-detail"><strong>Payload</strong><span>${assignments} assignment row(s)</span></div><div class="saved-detail"><strong>Validation Summary</strong><pre class="saved-json">${esc(JSON.stringify(item.validationSummary||{},null,2))}</pre></div>`;
}
function openInBuilder(id){
  const item=state.items.find(x=>x.id===id);if(!item)return;
  localStorage.setItem('signalScheduleBuilderLoad',JSON.stringify(item));
  location.href='builder.html?load=saved';
}
