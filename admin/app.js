/* ===================================================================
   RACP-IMSP — Espace coordinateur (app.js)
   Sécurité :
   • esc() : toute donnée issue de la base ou des formulaires publics
     est échappée avant insertion dans le HTML (anti-XSS stocké).
   • Le mode réel exige une session Supabase valide (lien magique) :
     l'e-mail saisi ne suffit pas à entrer.
   • SDK Supabase épinglé en version majeure (@2).
   Rappel : la vraie barrière de lecture des données reste la RLS
   côté Supabase — l'interface ne fait que l'afficher.
   =================================================================== */
"use strict";

const SUPABASE_ESM  = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";
const SUPABASE_URL  = (window.RACP_SUPABASE && window.RACP_SUPABASE.url)  || "";
const SUPABASE_ANON = (window.RACP_SUPABASE && window.RACP_SUPABASE.anon) || "";

/* Échappement HTML : à appliquer à TOUTE valeur dynamique interpolée. */
function esc(v) {
  return String(v == null ? "" : v)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
/* Entier sûr pour les attributs/valeurs numériques. */
function num(v) { const n = parseInt(v, 10); return Number.isFinite(n) ? n : 0; }

const ETAPES = ["soumise","en_revue","presentation_planifiee","engagement_valide","onboarde","en_attente_binome","jumele","actif","cloture"];
const ETAPE_LABEL = {soumise:"Soumise",en_revue:"En revue",presentation_planifiee:"Présentation",engagement_valide:"Engagement validé",onboarde:"Onboardé",en_attente_binome:"En attente binôme",jumele:"Jumelé",actif:"Actif",cloture:"Clôturé"};
const ETAPE_SET = new Set(ETAPES);

/* ---- Données de démonstration ---- */
const DEMO = {
  apps: [
    {id:1,nom:"Koffi A.",role:"mentor",exp:"Data / IA",dispo:2,pays:"France",etape:"en_revue"},
    {id:2,nom:"Awa B.",role:"filleul",filiere:"MP → ingénierie",dispo:1,pays:"Bénin",etape:"soumise"},
    {id:3,nom:"Sékou D.",role:"mentor",exp:"Génie civil",dispo:1,pays:"Maroc",etape:"engagement_valide"},
    {id:4,nom:"Fatou N.",role:"filleul",filiere:"PC → chimie",dispo:1,pays:"Bénin",etape:"en_attente_binome"},
    {id:5,nom:"Yao K.",role:"mentor",exp:"Recherche / physique",dispo:2,pays:"Bénin",etape:"onboarde"},
    {id:6,nom:"Inès T.",role:"filleul",filiere:"MP → data",dispo:2,pays:"Bénin",etape:"en_attente_binome"},
    {id:7,nom:"Moussa S.",role:"mentor",exp:"Finance / stats",dispo:1,pays:"France",etape:"presentation_planifiee"},
    {id:8,nom:"Léa P.",role:"filleul",filiere:"PSI → énergie",dispo:1,pays:"Bénin",etape:"soumise"},
  ],
  pairs: [
    {id:1,mentor:"Aïcha M.",mentee:"Rachid O.",referent:"Coordination",statut:"actif",last:"il y a 8 j"},
    {id:2,mentor:"Jean B.",mentee:"Sara K.",referent:"Coordination",statut:"actif",last:"il y a 21 j"},
    {id:3,mentor:"Paul E.",mentee:"Nadia F.",referent:"Coordination",statut:"pause",last:"il y a 40 j"},
  ],
  members: [
    {nom:"Aïcha M.",promo:"MP 2018",role:"mentor",pays:"France"},
    {nom:"Jean B.",promo:"PC 2016",role:"mentor",pays:"Bénin"},
    {nom:"Rachid O.",promo:"MP 2025",role:"filleul",pays:"Bénin"},
    {nom:"Sara K.",promo:"PSI 2025",role:"filleul",pays:"Bénin"},
    {nom:"Paul E.",promo:"MP 2014",role:"mentor",pays:"Canada"},
  ],
};

let sb = null, isDemo = true, sessionEmail = "";
const state = {apps:[],pairs:[],members:[]};

/* ---- Couche de données (Supabase si session valide, sinon démo) ---- */
async function loadData(forceDemo) {
  if (!forceDemo && SUPABASE_URL && SUPABASE_ANON) {
    try {
      const m = await import(SUPABASE_ESM);
      sb = m.createClient(SUPABASE_URL, SUPABASE_ANON);
      const { data: { session } } = await sb.auth.getSession();
      if (!session) throw new Error("aucune session — connexion requise");
      sessionEmail = (session.user && session.user.email) || "coordinateur";
      isDemo = false;
      const [ma, fa, pr, pf] = await Promise.all([
        sb.from("mentor_applications").select("*"),
        sb.from("mentee_applications").select("*"),
        sb.from("pairings").select("*"),
        sb.from("profiles").select("*"),
      ]);
      state.apps = [].concat(
        (ma.data || []).map(x => ({...x, role: "mentor",
          nom: ((x.prenom || "") + " " + (x.nom || "")).trim() || ("#" + x.id),
          exp: x.expertise || "",
          filiere: x.filiere || "",
          dispo: num(x.dispo_h) || 1 })),
        (fa.data || []).map(x => ({...x, role: "filleul",
          nom: ((x.prenom || "") + " " + (x.nom || "")).trim() || ("#" + x.id),
          filiere: x.filiere_visee || x.filiere || "",
          dispo: num(x.dispo) || 1 })));
      state.pairs = pr.data || [];
      state.members = pf.data || [];
      return;
    } catch (e) { console.warn("Supabase indisponible ou session absente, bascule en démo.", e); }
  }
  isDemo = true;
  state.apps = JSON.parse(JSON.stringify(DEMO.apps));
  state.pairs = JSON.parse(JSON.stringify(DEMO.pairs));
  state.members = JSON.parse(JSON.stringify(DEMO.members));
}

/* ---- Rendu (toutes les valeurs dynamiques passent par esc/num) ---- */
function renderDash() {
  const a = state.apps;
  const pending = a.filter(x => !["actif","cloture","jumele"].includes(x.etape)).length;
  const mentors = a.filter(x => x.role === "mentor").length;
  const filleuls = a.filter(x => x.role === "filleul").length;
  const activePairs = state.pairs.filter(p => p.statut === "actif").length;
  document.getElementById("dash-stats").innerHTML = [
    ["Candidatures en cours", pending], ["Binômes actifs", activePairs], ["Mentors", mentors], ["Filleul·e·s", filleuls]
  ].map(([l, n]) => `<div class="stat accent"><div class="n">${num(n)}</div><div class="l">${esc(l)}</div></div>`).join("");
  const counts = ETAPES.map(e => ({e, n: a.filter(x => x.etape === e).length}));
  const max = Math.max(1, ...counts.map(c => c.n));
  document.getElementById("dash-funnel").innerHTML = counts.map(c => `
    <div class="funnel-row" style="display:flex;align-items:center;gap:1rem;margin:.4rem 0">
      <div style="width:150px;font-size:.82rem;color:var(--muted)">${esc(ETAPE_LABEL[c.e])}</div>
      <div style="flex:1;background:var(--paper);border-radius:8px;overflow:hidden;height:22px">
        <div class="funnel-bar" style="width:${Math.round(c.n / max * 100)}%;height:100%;background:linear-gradient(90deg,var(--blue),var(--cyan));min-width:${c.n ? '8px' : '0'}"></div></div>
      <div style="font-family:var(--mono);font-size:.8rem;width:24px;text-align:right">${num(c.n)}</div>
    </div>`).join("");
}

function appCard(a) {
  const role = a.role === "mentor" ? "mentor" : "filleul";
  return `<div class="appcard"><div><span class="nm">${esc(a.nom)}</span><span class="role ${role}">${role}</span></div>
    <div class="meta">${esc(a.role === "mentor" ? (a.exp || "") : (a.filiere || ""))} · ${esc(a.pays || "")}</div>
    <select data-id="${esc(a.id)}">${ETAPES.map(e => `<option value="${e}" ${e === a.etape ? "selected" : ""}>${esc(ETAPE_LABEL[e])}</option>`).join("")}</select></div>`;
}

function renderKanban() {
  const k = document.getElementById("kanban");
  k.innerHTML = ETAPES.map(e => {
    const items = state.apps.filter(x => x.etape === e);
    return `<div class="col"><div class="col-h"><b>${esc(ETAPE_LABEL[e])}</b><span class="cnt">${items.length}</span></div>
      <div class="col-body">${items.map(appCard).join("") || '<p style="color:var(--muted2);font-size:.8rem;padding:.4rem">—</p>'}</div></div>`;
  }).join("");
  k.querySelectorAll("select[data-id]").forEach(s => s.addEventListener("change", async () => {
    const app = state.apps.find(x => String(x.id) === String(s.dataset.id));
    if (!app || !ETAPE_SET.has(s.value)) return;   // valeur d'étape validée
    app.etape = s.value;
    if (!isDemo && sb) {
      const tbl = app.role === "mentor" ? "mentor_applications" : "mentee_applications";
      await sb.from(tbl).update({etape: s.value}).eq("id", app.id);
    }
    renderKanban(); renderDash();
  }));
}

function renderBino() {
  const t = document.getElementById("bino-table");
  t.innerHTML = `<thead><tr><th>Mentor</th><th>Filleul·e</th><th>Référent</th><th>Statut</th><th>Dernière session</th></tr></thead>
   <tbody>${state.pairs.map(p => {
     const st = p.statut === "actif" ? "actif" : "pause";
     return `<tr><td><b>${esc(p.mentor || p.mentor_id)}</b></td><td>${esc(p.mentee || p.mentee_id)}</td><td>${esc(p.referent || "—")}</td>
   <td><span class="pill ${st}">${esc(p.statut)}</span></td><td style="color:var(--muted)">${esc(p.last || "—")}</td></tr>`;
   }).join("")}</tbody>`;
}

function renderMemb() {
  const t = document.getElementById("memb-table");
  t.innerHTML = `<thead><tr><th>Nom</th><th>Promotion</th><th>Rôle</th><th>Pays</th></tr></thead>
   <tbody>${state.members.map(m => `<tr><td><b>${esc(m.nom)}</b></td><td>${esc(m.promo || m.promotion || "—")}</td><td>${esc(m.role || "membre")}</td><td>${esc(m.pays || "—")}</td></tr>`).join("")}</tbody>`;
}

/* ---- Matching ---- */
function openPair() {
  const mentees = state.apps.filter(a => a.role === "filleul" && a.etape === "en_attente_binome");
  const mentors = state.apps.filter(a => a.role === "mentor");
  const ms = document.getElementById("pick-mentee"), mt = document.getElementById("pick-mentor");
  ms.innerHTML = mentees.map(m => `<option value="${esc(m.id)}">${esc(m.nom)} — ${esc(m.filiere || "")}</option>`).join("") || "<option>Aucun·e en attente</option>";
  mt.innerHTML = mentors.map(m => `<option value="${esc(m.id)}">${esc(m.nom)} — ${esc(m.exp || "")}</option>`).join("");
  ms.onchange = suggest; suggest();
  document.getElementById("pair-modal").classList.add("open");
}

function suggest() {
  const mid = document.getElementById("pick-mentee").value;
  const mentee = state.apps.find(a => String(a.id) === String(mid));
  if (!mentee) return;
  const kw = (mentee.filiere || "").toLowerCase();
  const mentors = state.apps.filter(a => a.role === "mentor");
  const scored = mentors.map(m => {
    let s = 0; const e = (m.exp || "").toLowerCase();
    if (kw.includes("data") && e.includes("data")) s += 2;
    if (kw.includes("physique") && e.includes("physique")) s += 2;
    if (kw.includes("chimie") && e.includes("chimie")) s += 2;
    if (m.pays === mentee.pays) s += 1;
    if (m.dispo >= mentee.dispo) s += 1;
    return {m, s};
  }).sort((a, b) => b.s - a.s);
  const best = scored[0];
  if (best) {
    document.getElementById("pick-mentor").value = best.m.id;
    document.getElementById("pair-suggest").innerHTML =
      `Suggestion : <b>${esc(best.m.nom)}</b> (${esc(best.m.exp)}) — compatibilité sur le domaine, la disponibilité et le fuseau.`;
  }
}

async function createPair() {
  const mentee = state.apps.find(a => String(a.id) === String(document.getElementById("pick-mentee").value));
  const mentor = state.apps.find(a => String(a.id) === String(document.getElementById("pick-mentor").value));
  if (!mentee || !mentor) return;
  state.pairs.unshift({id: Date.now(), mentor: mentor.nom, mentee: mentee.nom, referent: "Coordination", statut: "actif", last: "à l'instant"});
  mentee.etape = "jumele"; mentor.etape = "actif";
  if (!isDemo && sb) { await sb.from("pairings").insert({mentor_id: mentor.id, mentee_id: mentee.id, statut: "actif"}); }
  document.getElementById("pair-modal").classList.remove("open");
  renderBino(); renderKanban(); renderDash();
}

/* ---- Navigation ---- */
function show(view) {
  document.querySelectorAll(".navbtn").forEach(b => b.classList.toggle("active", b.dataset.view === view));
  document.querySelectorAll(".view").forEach(v => v.classList.toggle("active", v.id === "view-" + view));
  const titles = {dash: "Tableau de bord", cand: "Candidatures", bino: "Binômes", memb: "Membres"};
  document.getElementById("view-title").textContent = titles[view] || "";
}
document.querySelectorAll(".navbtn").forEach(b => b.addEventListener("click", () => show(b.dataset.view)));

async function start(forceDemo) {
  await loadData(forceDemo);
  document.getElementById("login").classList.add("hide");
  document.getElementById("app").classList.remove("hide");
  document.getElementById("mode-badge").style.display = isDemo ? "" : "none";
  document.getElementById("who-email").textContent = isDemo ? "démo" : sessionEmail;
  renderDash(); renderKanban(); renderBino(); renderMemb();
}

document.getElementById("demo-btn").addEventListener("click", () => start(true));

document.getElementById("login-btn").addEventListener("click", async () => {
  const email = document.getElementById("login-email").value.trim();
  const msg = document.getElementById("login-msg");
  if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email)) {
    msg.textContent = "Merci d'indiquer une adresse e-mail valide.";
    return;
  }
  if (SUPABASE_URL && SUPABASE_ANON) {
    try {
      const m = await import(SUPABASE_ESM);
      const c = m.createClient(SUPABASE_URL, SUPABASE_ANON);
      const { error } = await c.auth.signInWithOtp({ email });
      if (error) throw error;
      msg.textContent = "Lien de connexion envoyé. Consultez votre boîte mail.";
      return;
    } catch (e) {
      msg.textContent = "Connexion impossible pour le moment. Réessayez.";
      console.error(e);
      return;
    }
  }
  msg.textContent = "Supabase n'est pas configuré (assets/supabase-config.js). Utilisez le mode démonstration.";
});

document.getElementById("logout").addEventListener("click", async () => {
  try { if (sb) await sb.auth.signOut(); } catch (e) { /* session locale uniquement */ }
  location.reload();
});
document.getElementById("new-pair").addEventListener("click", openPair);
document.getElementById("pair-cancel").addEventListener("click", () => document.getElementById("pair-modal").classList.remove("open"));
document.getElementById("pair-create").addEventListener("click", createPair);
document.getElementById("pair-modal").addEventListener("click", (e) => {
  if (e.target.id === "pair-modal") e.target.classList.remove("open");
});

/* Retour via le lien magique : si une session est déjà ouverte, on entre. */
(async function restoreSession() {
  if (!(SUPABASE_URL && SUPABASE_ANON)) return;
  try {
    const m = await import(SUPABASE_ESM);
    const c = m.createClient(SUPABASE_URL, SUPABASE_ANON);
    const { data: { session } } = await c.auth.getSession();
    if (session) start(false);
  } catch (e) { /* pas de session, on reste sur l'écran de connexion */ }
})();
