-- =====================================================================
--  RACP-IMSP — Schéma de base (Phase 2 : back-office mentorat)
--  Cible : Supabase / PostgreSQL.  À importer dans l'éditeur SQL.
--  Pipeline calqué sur le modèle Rura (candidature -> matching -> suivi).
-- =====================================================================

-- ---------- Types ----------
create type role_membre as enum ('membre','mentor','filleul','coordinateur');
create type etape_candidature as enum (
  'soumise','en_revue','presentation_planifiee','engagement_valide',
  'onboarde','en_attente_binome','jumele','actif','cloture','refuse'
);
create type statut_binome as enum ('actif','en_pause','cloture');
create type type_alerte as enum ('silence_radio','compte_rendu_manquant','relance');

-- ---------- Profils (liés à auth.users de Supabase) ----------
create table profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  role          role_membre not null default 'membre',
  nom           text not null,
  prenom        text,
  promotion     text,                 -- année de sortie / promo IMSP
  filiere       text,                 -- MP, PC, PSI...
  parcours      text,                 -- parcours post-prépa
  pays          text,
  fuseau        text,
  liens         jsonb default '{}',   -- {linkedin, ...}
  visibilite    text default 'membres', -- 'membres' | 'prive'
  ouvert_mentorat boolean default false,
  consent_at    timestamptz,
  created_at    timestamptz default now()
);

-- ---------- Candidatures mentor ----------
create table mentor_applications (
  id          bigint generated always as identity primary key,
  profile_id  uuid references profiles(id) on delete cascade,
  expertise   text,
  dispo_h     int,
  canaux      text[],               -- {whatsapp, visio, email}
  capacite    int default 1,
  motivation  text,
  etape       etape_candidature not null default 'soumise',
  charte_at   timestamptz,
  created_at  timestamptz default now()
);

-- ---------- Candidatures filleul ----------
create table mentee_applications (
  id            bigint generated always as identity primary key,
  profile_id    uuid references profiles(id) on delete cascade,
  niveau        text,
  filiere_visee text,
  objectifs     text,
  difficultes   text,
  ecoles_cibles text,
  canaux        text[],
  etape         etape_candidature not null default 'soumise',
  charte_at     timestamptz,
  autorisation_parentale boolean default false,
  created_at    timestamptz default now()
);

-- ---------- Pièces justificatives ----------
create table documents (
  id           bigint generated always as identity primary key,
  profile_id   uuid references profiles(id) on delete cascade,
  type         text,                 -- identite | attestation | autorisation
  fichier_url  text,                 -- Supabase Storage
  valide_par   uuid references profiles(id),
  valide_at    timestamptz,
  created_at   timestamptz default now()
);

-- ---------- Binômes ----------
create table pairings (
  id           bigint generated always as identity primary key,
  mentor_id    uuid references profiles(id),
  mentee_id    uuid references profiles(id),
  referent_id  uuid references profiles(id),   -- coordinateur qui suit le binôme
  statut       statut_binome not null default 'actif',
  objectifs    text,
  doc_partage_url text,
  created_at   timestamptz default now(),
  closed_at    timestamptz
);

-- ---------- Sessions mensuelles ----------
create table sessions (
  id          bigint generated always as identity primary key,
  pairing_id  bigint references pairings(id) on delete cascade,
  date        date,
  duree_min   int,
  sujet       text,
  actions     text,                 -- prochaines actions convenues
  created_at  timestamptz default now()
);

-- ---------- Comptes-rendus (transmis au référent) ----------
create table session_reports (
  id          bigint generated always as identity primary key,
  session_id  bigint references sessions(id) on delete cascade,
  redige_par  uuid references profiles(id),
  contenu     text,
  transmis_at timestamptz default now()
);

-- ---------- Alertes de suivi ----------
create table alerts (
  id          bigint generated always as identity primary key,
  pairing_id  bigint references pairings(id) on delete cascade,
  type        type_alerte,
  statut      text default 'ouverte',  -- ouverte | traitee
  created_at  timestamptz default now()
);

-- ---------- Ressources & événements ----------
create table resources (
  id          bigint generated always as identity primary key,
  titre       text not null,
  categorie   text,
  fichier_url text,
  acces       text default 'public',   -- public | membre
  created_at  timestamptz default now()
);

create table events (
  id          bigint generated always as identity primary key,
  titre       text not null,
  date        date,
  lieu        text,
  description text,
  created_at  timestamptz default now()
);

-- =====================================================================
--  Sécurité (Row Level Security) — esquisse à affiner
-- =====================================================================
alter table profiles            enable row level security;
alter table mentor_applications enable row level security;
alter table mentee_applications enable row level security;
alter table pairings            enable row level security;
alter table sessions            enable row level security;
alter table session_reports     enable row level security;

-- Helper : l'utilisateur courant est-il coordinateur ?
create or replace function is_coordinateur() returns boolean as $$
  select exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'coordinateur');
$$ language sql security definer stable;

-- Chacun lit/écrit son propre profil ; le coordinateur voit tout.
create policy "profil: lecture propre ou coordinateur"
  on profiles for select using (id = auth.uid() or is_coordinateur());
create policy "profil: mise à jour propre"
  on profiles for update using (id = auth.uid());

-- Annuaire : les membres connectés voient les profils 'membres' & ouverts.
create policy "annuaire: membres visibles"
  on profiles for select using (visibilite = 'membres' and auth.uid() is not null);

-- Candidatures : le candidat voit la sienne ; le coordinateur voit tout.
create policy "cand. mentor: propre ou coord"
  on mentor_applications for select using (profile_id = auth.uid() or is_coordinateur());
create policy "cand. filleul: propre ou coord"
  on mentee_applications for select using (profile_id = auth.uid() or is_coordinateur());

-- Binômes : visibles par leurs deux membres, leur référent, ou le coordinateur.
create policy "binome: membres du binôme ou coord"
  on pairings for select using (
    mentor_id = auth.uid() or mentee_id = auth.uid()
    or referent_id = auth.uid() or is_coordinateur()
  );

-- Sessions & comptes-rendus : réservés aux membres du binôme et au coordinateur.
create policy "sessions: binôme ou coord"
  on sessions for select using (
    exists (select 1 from pairings p where p.id = sessions.pairing_id
            and (p.mentor_id = auth.uid() or p.mentee_id = auth.uid()
                 or p.referent_id = auth.uid())) or is_coordinateur()
  );
create policy "cr: binôme ou coord"
  on session_reports for select using (
    exists (select 1 from sessions s join pairings p on p.id = s.pairing_id
            where s.id = session_reports.session_id
            and (p.mentor_id = auth.uid() or p.mentee_id = auth.uid()
                 or p.referent_id = auth.uid())) or is_coordinateur()
  );

-- NB : ajouter les policies INSERT/UPDATE/DELETE selon les rôles avant la mise en production.

-- =====================================================================
--  Phase 2b — Formulaires publics opérationnels
--  À exécuter APRÈS le schéma ci-dessus, dans l'éditeur SQL Supabase.
--  Rend les tables de candidatures compatibles avec les formulaires du
--  site et autorise le dépôt public (lecture réservée au coordinateur).
--  Idempotent : peut être ré-exécuté sans risque.
-- =====================================================================

-- ---------- Colonnes alignées sur le formulaire « parrain » ----------
alter table mentor_applications
  add column if not exists prenom    text,
  add column if not exists nom       text,
  add column if not exists email     text,
  add column if not exists whatsapp  text,
  add column if not exists pays      text,
  add column if not exists fuseau    text,
  add column if not exists promotion text,
  add column if not exists filiere   text,
  add column if not exists parcours  text,
  add column if not exists charte    boolean default false,
  add column if not exists rgpd      boolean default false;

-- ---------- Colonnes alignées sur le formulaire « filleul·e » ----------
alter table mentee_applications
  add column if not exists prenom    text,
  add column if not exists nom       text,
  add column if not exists email     text,
  add column if not exists whatsapp  text,
  add column if not exists ville     text,
  add column if not exists dispo     text,
  add column if not exists canal     text,
  add column if not exists charte    boolean default false,
  add column if not exists rgpd      boolean default false,
  add column if not exists parental  boolean default false;

-- Le dépôt est anonyme : profile_id reste nul (rattachement éventuel plus tard).
alter table mentor_applications alter column profile_id drop not null;
alter table mentee_applications alter column profile_id drop not null;

-- ---------- RLS : dépôt public en INSERTION seulement ----------
alter table mentor_applications enable row level security;
alter table mentee_applications enable row level security;

drop policy if exists "candidature mentor: depot public" on mentor_applications;
create policy "candidature mentor: depot public"
  on mentor_applications for insert to anon with check (true);

drop policy if exists "candidature filleul: depot public" on mentee_applications;
create policy "candidature filleul: depot public"
  on mentee_applications for insert to anon with check (true);

-- ---------- Le coordinateur lit et fait avancer les candidatures ----------
drop policy if exists "mentor apps: coordinateur" on mentor_applications;
create policy "mentor apps: coordinateur"
  on mentor_applications for all to authenticated
  using (is_coordinateur()) with check (is_coordinateur());

drop policy if exists "filleul apps: coordinateur" on mentee_applications;
create policy "filleul apps: coordinateur"
  on mentee_applications for all to authenticated
  using (is_coordinateur()) with check (is_coordinateur());

-- ---------- Privilèges de table ----------
grant insert on mentor_applications, mentee_applications to anon;
grant select, insert, update, delete on mentor_applications, mentee_applications to authenticated;

-- NB sécurité : le dépôt public est ouvert (with check true). Pour limiter le
-- spam en production, ajoutez un captcha (hCaptcha/Turnstile via une Edge
-- Function) ou un rate-limit. Les données ne sont JAMAIS lisibles par le public
-- (aucune policy SELECT pour le rôle anon).
