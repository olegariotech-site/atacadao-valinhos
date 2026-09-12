const menuToggle=document.querySelector('.menu-toggle');
const mainNav=document.querySelector('.main-nav');
if(menuToggle&&mainNav){menuToggle.addEventListener('click',()=>{const open=mainNav.classList.toggle('is-open');menuToggle.setAttribute('aria-expanded',String(open));});mainNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mainNav.classList.remove('is-open');menuToggle.setAttribute('aria-expanded','false');}));}
const searchForm=document.querySelector('.product-search');
const searchInput=document.querySelector('#product-search-input');
const cards=[...document.querySelectorAll('.product-card')];
const feedback=document.querySelector('.search-feedback');
const normalize=(v='')=>v.toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim();
function runSearch(term=''){const q=normalize(term);let count=0;cards.forEach(card=>{const hay=normalize(`${card.dataset.search||''} ${card.dataset.category||''} ${card.textContent||''}`);const show=!q||hay.includes(q);card.classList.toggle('is-hidden',!show);if(show)count++;});document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('is-active'));if(feedback){feedback.textContent=q?count?`${count} destaque(s) encontrado(s) para “${term}”.`:`Não encontrei esse termo nesta seleção da V1. Use o WhatsApp para consultar o catálogo completo.`:'';}}
if(searchForm&&searchInput){searchForm.addEventListener('submit',e=>{e.preventDefault();runSearch(searchInput.value);document.querySelector('#destaques')?.scrollIntoView({behavior:'smooth',block:'start'});});}
document.querySelectorAll('.quick-tags button').forEach(btn=>btn.addEventListener('click',()=>{if(searchInput)searchInput.value=btn.textContent.trim();runSearch(btn.textContent.trim());document.querySelector('#destaques')?.scrollIntoView({behavior:'smooth',block:'start'});}));
document.querySelectorAll('[data-query]').forEach(el=>el.addEventListener('click',()=>{const q=el.dataset.query||'';if(searchInput)searchInput.value=q;setTimeout(()=>runSearch(q),200);}));
document.querySelectorAll('.filter-btn').forEach(btn=>btn.addEventListener('click',()=>{const filter=btn.dataset.filter||'all';document.querySelectorAll('.filter-btn').forEach(b=>b.classList.toggle('is-active',b===btn));if(searchInput)searchInput.value='';if(feedback)feedback.textContent='';cards.forEach(card=>{const cats=(card.dataset.category||'').split(' ');card.classList.toggle('is-hidden',filter!=='all'&&!cats.includes(filter));});}));
