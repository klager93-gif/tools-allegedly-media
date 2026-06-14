/* Signal Labs | Signal Schedule | schedule/pages/admin/data-tools.js | v5.1.0 */
const esc=(v)=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const $=(s)=>document.querySelector(s);
fetch('data/employee-experience-data-tools-preview.json').then(r=>r.json()).then(render).catch((error)=>{document.querySelector('.data-tools-shell').insertAdjacentHTML('beforeend',`<section class="schedule-card"><h2>Data failed to load</h2><p>${esc(error.message)}</p></section>`);});
function render(data){
  $('[data-role-inheritance]').innerHTML=`<div class="data-tools-list">${data.roleInheritance.map((role,i)=>`<div class="data-tools-role"><strong>${esc(role)}</strong>${i<data.roleInheritance.length-1?'<span class="data-tools-arrow">inherits ↓</span>':''}</div>`).join('')}<p><strong>Admin = Employee + More.</strong> Every employee self-service button must also work for admins.</p></div>`;
  $('[data-template-list]').innerHTML=list(data.templates,(t)=>`<strong>${esc(t.name)}</strong><span>${esc(t.type)} • ${esc(t.updated)}</span><span class="data-tools-pill">${esc(t.status)}</span><button type="button" class="data-tools-pill" data-copy-value="${esc(t.id)}">Copy ID</button>`);
  $('[data-import-list]').innerHTML=list(data.imports,(item)=>`<strong>${esc(item.name)}</strong><span>${esc(item.notes)}</span><span class="data-tools-pill">${esc(item.status)}</span>`);
  $('[data-export-list]').innerHTML=list(data.exports,(item)=>`<strong>${esc(item.name)}</strong><span>${esc(item.format)}</span><span class="data-tools-pill">${esc(item.status)}</span>`);
  $('[data-profile-fields]').innerHTML=`<table><thead><tr><th>Field</th><th>Label</th><th>Owner</th><th>Admin Review</th></tr></thead><tbody>${data.profileFields.map(f=>`<tr><td><code>${esc(f.field)}</code></td><td>${esc(f.label)}</td><td>${esc(f.owner)}</td><td>${f.adminReview?'Yes':'No'}</td></tr>`).join('')}</tbody></table>`;
  wireCopy();
}
function list(items,template){return `<div class="data-tools-list">${items.map(item=>`<div class="data-tools-item">${template(item)}</div>`).join('')}</div>`;}
function wireCopy(){document.querySelectorAll('[data-copy-value]').forEach(btn=>btn.addEventListener('click',async()=>{const value=btn.dataset.copyValue||'';try{await navigator.clipboard.writeText(value);btn.classList.add('copy-ok');setTimeout(()=>btn.classList.remove('copy-ok'),700);}catch(_e){window.prompt('Copy value',value);}}));}
