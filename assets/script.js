const pages=[['index.html','Accueil'],['tandem.html','Tandem'],['formation.html','Formation'],['planning.html','Planning'],['pro-flyers.html','Pro-flyers']];
const cur=location.pathname.split('/').pop()||'index.html';
document.body.insertAdjacentHTML('afterbegin',`<header><a class="logo" href="index.html">Parachute Club d'Aix-en-Provence</i></a><button id="burger" aria-expanded="false" aria-controls="nav">Menu</button><nav id="nav">${pages.map(([h,t])=>`<a href="${h}" class="${h===cur?'on':''}">${t}</a>`).join('')}</nav></header><div class="alti" aria-hidden="true"><b></b></div>`);
document.body.insertAdjacentHTML('beforeend',`<footer><div class="wrap"><div><strong>Parachute Club d'Aix-en-Provence</strong><br>Aérodrome des Milles <br>06 14 08 35 98<br>Contact@paraclubaix.com</div><div>Ouvert du jeudi au dimanche<br>Sauts selon la météo <br> <div><a class="btn" style="background:var(--night);color:#fff" href="">Confidentialité</a><a class="btn" style="background:var(--night);color:#fff" href="">Conditions générales</a><a class="btn" style="background:var(--night);color:#fff" href="">Diplômes</a>
  </div></div></div></footer>`);
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
$('#burger').onclick=e=>{const o=$('#nav').classList.toggle('open');e.target.setAttribute('aria-expanded',o)};
// Altimètre : 4000 m en haut de page, 0 m (sol) en bas
const bub=$('.alti b'),root=document.documentElement;
const tick=()=>{const m=document.body.scrollHeight-innerHeight,p=m>0?Math.min(1,scrollY/m):0,a=Math.round(4000*(1-p)/10)*10;
bub.style.top=p*100+'%';bub.textContent=a?a.toLocaleString('fr-FR')+' m':'sol';root.style.setProperty('--y',scrollY)};
addEventListener('scroll',tick,{passive:true});addEventListener('resize',tick);tick();
// Onglets génériques
$$('.tabs[data-tabs]').forEach(t=>t.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
t.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b));
$$('.tp').forEach(p=>p.hidden=p.id!==b.dataset.t)}));
// Planning
const L=$('#planning');
if(L){const D=['mercredi','jeudi','vendredi','samedi','dimanche'],lab={tandem:'Tandem',formation:'Formation',pro:'Pro-flyers'};
const S=[[0,'09:00','Tandem, vols du matin','tandem'],[0,'14:00','Initiation PAC, journée théorique','formation'],[1,'10:00','Tandem, vols du matin','tandem'],[1,'15:00','AFF niveaux 1 et 2','formation'],[2,'09:30','Tandem, vols du matin','tandem'],[2,'16:00','Coaching freefly','pro'],[3,'08:30','Tandem, rotations toute la journée','tandem'],[3,'11:00','AFF niveaux 3 à 5','formation'],[3,'17:00','Vols de groupe','pro'],[4,'09:00','Tandem, vols du matin','tandem'],[4,'13:00','Brevet : sauts de perfectionnement','formation'],[4,'16:30','Wingsuit et sessions libres','pro']];
let d=Math.max(0,D.indexOf(new Date().toLocaleDateString('fr-FR',{weekday:'long'}))),f='all';
const dt=$('#days'),ft=$('#types');
const draw=()=>{dt.innerHTML=D.map((x,i)=>`<button class="${i===d?'on':''}" data-i="${i}">${x}</button>`).join('');
const r=S.filter(s=>s[0]===d&&(f==='all'||s[3]===f));
L.innerHTML=r.map(s=>`<div class="slot"><time>${s[1]}</time><span>${s[2]}</span><span class="tag ${s[3]}">${lab[s[3]]}</span></div>`).join('')||'<p>Aucun créneau ce jour-là pour ce filtre.</p>'};
dt.onclick=e=>{if(e.target.dataset.i){d=+e.target.dataset.i;draw()}};
ft.onclick=e=>{const b=e.target.closest('button');if(!b)return;f=b.dataset.f;ft.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b));draw()};draw()}
// Calculateur tandem
const C=$('#calc');
if(C){const up=()=>{const n=+$('#nb').value||1,v=$('#vid').checked?99:0,p=$('#pho').checked?59:0;$('#tot').textContent=(n*(290+v+p)).toLocaleString('fr-FR')+' €'};C.oninput=up;up()}
$$('form').forEach(f=>f.onsubmit=e=>{e.preventDefault();f.nextElementSibling.style.display='block';f.reset()});
