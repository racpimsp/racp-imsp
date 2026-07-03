/* === Bibliothèque RACP-IMSP (style étagères + couvertures) ===
   Pour ajouter une ressource, copiez une entrée ci-dessous.
   type: "video" | "livre" | "doc"   ·   cat: catégorie (= filtres)
   featured:true -> apparaît dans « Sélection de l'équipe »
   isNew:true    -> apparaît dans « Nouveautés »
   Vidéo: renseignez "yt" (id YouTube, 11 caractères) pour la lecture intégrée,
   sinon laissez "" et la carte ouvrira "url".                                   */
const LIB = [
  {type:"doc", cat:"Annales & concours", title:"Annales blanches 2025 — Maths & Physique", author:"RACP-IMSP · PDF", featured:true, isNew:true,
   desc:"Sujet d'entraînement (4 h) en maths et physique, avec modalités. Exemple fictif à remplacer par vos vrais sujets.", url:"assets/docs/annales-blanches-2025.pdf"},
  {type:"video", cat:"Mathématiques", title:"Maths et tiques — Yvan Monka", author:"Chaîne YouTube", featured:true,
   desc:"Des centaines de cours et méthodes, du lycée à la prépa. Idéal pour réviser les bases.", url:"https://www.youtube.com/user/YMONKA", yt:""},
  {type:"video", cat:"Mathématiques", title:"3Blue1Brown", author:"Chaîne YouTube (EN)", featured:true,
   desc:"Algèbre linéaire, analyse, séries de Fourier en visualisations devenues incontournables.", url:"https://www.youtube.com/@3blue1brown", yt:""},
  {type:"video", cat:"Mathématiques", title:"Science4All", author:"Lê Nguyen Hoang",
   desc:"Probabilités, logique et informatique théorique, vulgarisation exigeante.", url:"https://www.youtube.com/channel/UC0NCbj8CxzeCGIF6sODJ-7A", yt:""},
  {type:"video", cat:"Mathématiques", title:"El Jj — Deux minutes pour…", author:"Jérôme Cottanceau",
   desc:"Des sujets de maths surprenants et bien construits pour la culture mathématique.", url:"https://www.youtube.com/c/ElJj42", yt:""},
  {type:"video", cat:"Mathématiques", title:"Micmaths — Mickaël Launay", author:"Chaîne YouTube",
   desc:"Jeux, énigmes et histoire des mathématiques pour garder le goût des maths.", url:"https://www.youtube.com/c/Micmaths", yt:""},
  {type:"video", cat:"Physique & sciences", title:"Science étonnante", author:"David Louapre", featured:true,
   desc:"Physique, maths et sciences par un docteur en physique. Technique et limpide.", url:"https://www.youtube.com/@ScienceEtonnante", yt:""},
  {type:"video", cat:"Physique & sciences", title:"ScienceClic", author:"Chaîne YouTube",
   desc:"La relativité générale et la physique moderne en animations remarquables.", url:"https://www.youtube.com/@ScienceClic", yt:""},
  {type:"video", cat:"Physique & sciences", title:"Zeste de Science — CNRS", author:"Chaîne YouTube",
   desc:"La recherche scientifique française vulgarisée par le CNRS, en formats courts.", url:"https://www.youtube.com/@ZestedeScience", yt:""},
  {type:"video", cat:"Méthode & orientation", title:"Hygiène Mentale", author:"Esprit critique & méthode",
   desc:"Raisonner, vérifier l'information et structurer sa pensée — utile au-delà des concours.", url:"https://www.youtube.com/@HygieneMentale", yt:""},
  {type:"livre", cat:"Annales & concours", title:"Tout-en-un MPSI — Mathématiques", author:"Coll. J'intègre · Dunod", featured:true, isNew:true,
   desc:"Cours complet et exercices corrigés couvrant tout le programme de première année (MPSI).", url:"https://www.dunod.com"},
  {type:"livre", cat:"Annales & concours", title:"Méthodes & exercices MP", author:"Coll. J'intègre · Dunod", isNew:true,
   desc:"Les méthodes types et de nombreux exercices corrigés, niveau deuxième année (MP).", url:"https://www.dunod.com"},
  {type:"livre", cat:"Annales & concours", title:"Physique tout-en-un PCSI", author:"Coll. J'intègre · Dunod", isNew:true,
   desc:"Tout le cours de physique de première année avec méthodes et exercices corrigés.", url:"https://www.dunod.com"},
  {type:"doc", cat:"Annales & concours", title:"Doc Solus — annales corrigées", author:"doc-solus.fr", featured:true, isNew:true,
   desc:"Énoncés et corrigés des concours CCINP, Centrale-Supélec, Mines-Ponts et Polytechnique.", url:"https://www.doc-solus.fr/"},
  {type:"doc", cat:"Annales & concours", title:"Bibmath — cours & exercices CPGE", author:"bibmath.net", isNew:true,
   desc:"Cours, exercices et annales de math sup / math spé (MPSI, PCSI, MP, PC).", url:"https://www.bibmath.net/"},
  {type:"doc", cat:"Annales & concours", title:"Maths-France", author:"maths-france.fr", isNew:true,
   desc:"Cours et exercices détaillés de MPSI et MP, librement accessibles (J.-L. Rouget).", url:"https://www.maths-france.fr/"},
  {type:"doc", cat:"Annales & concours", title:"Concours Maths CPGE (UPS)", author:"concours-maths-cpge.fr", isNew:true,
   desc:"Énoncés et corrigés gratuits de mathématiques et d'informatique des grands concours.", url:"https://concours-maths-cpge.fr/"},
  {type:"doc", cat:"Méthode & orientation", title:"Fiches écoles", author:"RACP-IMSP",
   desc:"Bénin, région, France et Maroc : voies, profils et logistique. En préparation.", url:"", soon:true},
  {type:"doc", cat:"Méthode & orientation", title:"Calendrier des concours", author:"RACP-IMSP",
   desc:"Les dates clés (les concours locaux tombent souvent en août–septembre). En préparation.", url:"", soon:true},
  {type:"doc", cat:"Documents officiels", title:"Statuts du RACP-IMSP", author:"Document officiel · PDF",
   desc:"Objet, organes, ressources et dispositions finales de l'association.", url:"assets/docs/statuts-racp-imsp.pdf"},
  {type:"doc", cat:"Documents officiels", title:"Règlement intérieur", author:"Document officiel · PDF",
   desc:"Adhésion, droits & devoirs, fonctionnement, finances, AG et médiation.", url:"assets/docs/reglement-interieur-racp-imsp.pdf"},
  {type:"livre", cat:"Documents officiels", title:"Kit Parrain / Marraine", author:"Programme mentorat · PDF",
   desc:"Guide du mentor : posture, méthode GROW, cycle de session, orientation. En préparation.", url:"", soon:true},
  {type:"livre", cat:"Documents officiels", title:"Kit Filleul·e", author:"Programme mentorat · PDF",
   desc:"Réussir sa prépa : mindset, organisation, stratégie d'écoles, candidatures. En préparation.", url:"", soon:true},
];

(function(){
  const grid=document.getElementById('lib-grid'), empty=document.getElementById('lib-empty');
  const shelves=document.getElementById('lib-shelves'), spot=document.getElementById('lib-spot'), q=document.getElementById('lib-q');
  const shelvesWrap=document.getElementById('lib-shelves-wrap');
  const TPLURAL={video:'Vidéos',livre:'Livres',doc:'Documents'};
  const modal=document.getElementById('lib-modal'), frame=modal.querySelector('.lib-modal-frame');
  const catTitle=document.getElementById('lib-cat-title'), count=document.getElementById('lib-count');
  const sortSel=document.getElementById('lib-sort-sel');
  let fType='all', fCat='all', fQ='', fSort='default';
  const TLABEL={video:'Vidéo',livre:'Livre',doc:'Document'};
  const CATCLASS={'Mathématiques':'c-math','Physique & sciences':'c-phys','Annales & concours':'c-ann','Méthode & orientation':'c-meth','Documents officiels':'c-off'};

  /* --- Stats d'en-tête --- */
  (function stats(){
    const cats=new Set(LIB.map(r=>r.cat));
    const free=LIB.filter(r=>r.url && !r.soon).length;
    const set=(id,n)=>{const el=document.getElementById(id);if(el)el.setAttribute('data-count',n);};
    set('stat-total',LIB.length); set('stat-cats',cats.size); set('stat-free',free);
  })();

  /* --- Compteurs sur les filtres --- */
  function decorateCounts(){
    const byType=t=>t==='all'?LIB.length:LIB.filter(r=>r.type===t).length;
    document.querySelectorAll('.lib-filters .chip').forEach(b=>{
      if(!b.querySelector('.n')) b.insertAdjacentHTML('beforeend',' <span class="n"></span>');
      b.querySelector('.n').textContent=byType(b.dataset.type);
    });
    const byCat=c=>c==='all'?LIB.length:LIB.filter(r=>r.cat===c).length;
    document.querySelectorAll('.lib-cats .catchip').forEach(b=>{
      const cat=b.dataset.cat.replace(/&amp;/g,'&');
      if(!b.querySelector('.n')) b.insertAdjacentHTML('beforeend',' <span class="n"></span>');
      b.querySelector('.n').textContent=byCat(cat);
    });
  }

  function cover(r){
    const i=LIB.indexOf(r);
    const cls=CATCLASS[r.cat]||'c-off';
    const play=r.type==='video'?'<span class="cover-play" aria-hidden="true">▶</span>':'';
    const ribbon=r.soon?'<span class="cover-ribbon">Bientôt</span>':(r.isNew?'<span class="cover-ribbon new">Nouveau</span>':'');
    return `<article class="cover ${cls}" data-i="${i}" tabindex="0" role="button" aria-label="${r.title} — ${TLABEL[r.type]}">
      <div class="cover-art">
        <span class="cover-type">${TLABEL[r.type]}</span>${ribbon}
        <span class="cover-title">${r.title}</span>
        <span class="cover-author">${r.author||''}</span>
        ${play}
        <span class="cover-brand">RACP·IMSP</span>
      </div>
      <div class="cover-cap"><p>${r.title}</p><span>${r.cat}</span></div>
    </article>`;
  }

  function open(r){
    if(r.soon) return;
    if(r.type==='video' && r.yt){ frame.innerHTML=`<iframe src="https://www.youtube-nocookie.com/embed/${r.yt}?autoplay=1" title="${r.title}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`; modal.hidden=false; document.body.style.overflow='hidden'; }
    else if(r.url){ window.open(r.url,'_blank','noopener'); }
  }
  function close(){ modal.hidden=true; frame.innerHTML=''; document.body.style.overflow=''; }
  modal.addEventListener('click',e=>{if(e.target===modal||e.target.classList.contains('lib-modal-close'))close();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.hidden)close();});

  function bind(scope){
    scope.querySelectorAll('.cover').forEach(c=>{
      const r=LIB[+c.dataset.i];
      c.addEventListener('click',()=>open(r));
      c.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open(r);}});
    });
  }

  /* --- Ressource à la une --- */
  function renderSpot(){
    const pick=LIB.find(r=>r.featured && (r.yt||r.url) && !r.soon) || LIB.find(r=>r.featured);
    if(!pick){ spot.innerHTML=''; return; }
    const cls=CATCLASS[pick.cat]||'c-off';
    const verb=pick.type==='video'?'Regarder':'Ouvrir';
    spot.innerHTML=`<div class="lib-spot reveal in">
      <div class="spot-cover"><div class="cover ${cls}"><div class="cover-art"><span class="cover-title">${pick.title}</span></div></div></div>
      <div class="lib-spot-body">
        <p class="eyebrow">À la une</p>
        <h3>${pick.title}</h3>
        <p>${pick.desc||''}</p>
        <p class="meta">${TLABEL[pick.type]} · ${pick.cat} · ${pick.author||''}</p>
      </div>
      <button class="btn btn-primary spot-go" type="button">${verb}</button>
    </div>`;
    spot.querySelector('.spot-go').addEventListener('click',()=>open(pick));
    spot.querySelector('.spot-cover .cover').addEventListener('click',()=>open(pick));
  }

  /* --- Étagères avec flèches de défilement --- */
  function shelf(title, items){
    if(!items.length) return '';
    return `<div class="shelf"><div class="shelf-head"><h3>${title}</h3>
      <div class="shelf-nav"><button type="button" data-dir="-1" aria-label="Précédent">‹</button><button type="button" data-dir="1" aria-label="Suivant">›</button></div></div>
      <div class="shelf-row">${items.map(cover).join('')}</div></div>`;
  }
  function renderShelves(){
    shelves.innerHTML = shelf("Sélection de l'équipe", LIB.filter(r=>r.featured)) + shelf("Nouveautés", LIB.filter(r=>r.isNew));
    bind(shelves);
    shelves.querySelectorAll('.shelf').forEach(s=>{
      const row=s.querySelector('.shelf-row');
      s.querySelectorAll('.shelf-nav button').forEach(b=>{
        b.addEventListener('click',()=>row.scrollBy({left:(+b.dataset.dir)*row.clientWidth*0.8,behavior:'smooth'}));
      });
    });
  }

  function sortItems(items){
    if(fSort==='az') return items.slice().sort((a,b)=>a.title.localeCompare(b.title,'fr'));
    if(fSort==='new') return items.slice().sort((a,b)=>(b.isNew?1:0)-(a.isNew?1:0));
    return items;
  }

  function renderGrid(){
    let items=LIB.filter(r=>(fType==='all'||r.type===fType)&&(fCat==='all'||r.cat===fCat)&&(fQ===''||(r.title+' '+r.desc+' '+(r.author||'')).toLowerCase().includes(fQ)));
    items=sortItems(items);
    grid.innerHTML=items.map(cover).join(''); empty.hidden=items.length>0; bind(grid);
    // Quand un filtre est actif (type, catégorie ou recherche), on masque les
    // étagères de mise en avant pour ne montrer que les résultats filtrés.
    const filtering = fType!=='all' || fCat!=='all' || fQ!=='';
    if(shelvesWrap) shelvesWrap.style.display = filtering ? 'none' : '';
    catTitle.textContent = fCat!=='all' ? fCat : (fType!=='all' ? TPLURAL[fType] : 'Tout le catalogue');
    const n=items.length;
    count.innerHTML = n===0 ? '' : `<b>${n}</b> ressource${n>1?'s':''}` + (fType!=='all'?` · ${TLABEL[fType].toLowerCase()}s`:'') + (fQ?` · « ${q.value.trim()} »`:'');
  }

  function resetFilters(){
    fType='all';fCat='all';fQ='';q.value='';
    document.querySelectorAll('.lib-filters .chip').forEach(x=>x.classList.toggle('active',x.dataset.type==='all'));
    document.querySelectorAll('.lib-cats .catchip').forEach(x=>x.classList.toggle('active',x.dataset.cat==='all'));
    renderGrid();
  }

  document.querySelectorAll('.lib-filters .chip').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.lib-filters .chip').forEach(x=>x.classList.remove('active'));b.classList.add('active');fType=b.dataset.type;renderGrid();}));
  document.querySelectorAll('.lib-cats .catchip').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.lib-cats .catchip').forEach(x=>x.classList.remove('active'));b.classList.add('active');fCat=b.dataset.cat.replace(/&amp;/g,'&');renderGrid();}));
  q.addEventListener('input',()=>{fQ=q.value.trim().toLowerCase();renderGrid();});
  sortSel.addEventListener('change',()=>{fSort=sortSel.value;renderGrid();});
  const resetBtn=document.getElementById('lib-reset'); if(resetBtn) resetBtn.addEventListener('click',resetFilters);

  decorateCounts(); renderSpot(); renderShelves(); renderGrid();
})();
