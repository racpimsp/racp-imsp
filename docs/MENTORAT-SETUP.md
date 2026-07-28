# Rendre le mentorat opérationnel — recevoir les candidatures

Les deux formulaires (`devenir-parrain.html` et `devenir-filleul.html`) savent
envoyer une candidature de **trois** façons, dans cet ordre de priorité :

1. **Supabase** — si `assets/supabase-config.js` est renseigné. La candidature
   est enregistrée en base et apparaît dans l'espace coordinateur (`admin/`).
2. **Formspree** — si l'attribut `data-endpoint` du formulaire contient une
   vraie URL. La candidature arrive par e-mail + dans le tableau Formspree.
3. **Démonstration** — sinon : la confirmation s'affiche, rien n'est envoyé.

Choisissez **une** des deux routes ci-dessous.

---

## Route A — Formspree (≈ 10 min, sans serveur) — pour démarrer vite

À privilégier si vous voulez **recevoir les candidatures par e-mail dès
aujourd'hui**, sans base de données.

1. Créez un compte sur https://formspree.io (offre gratuite : 50 envois/mois).
2. Créez **deux** formulaires : « Candidatures parrain » et « Candidatures
   filleul ». Chacun fournit une URL du type `https://formspree.io/f/abcXXXX`.
3. Dans `devenir-parrain.html`, remplacez dans la balise `<form …>` :
   `data-endpoint="https://formspree.io/f/VOTRE_ID_FORMSPREE"`
   par l'URL du formulaire **parrain**.
4. Faites de même dans `devenir-filleul.html` avec l'URL du formulaire
   **filleul**.
5. Laissez `assets/supabase-config.js` vide (sinon Supabase prend le dessus).
6. Publiez le site, envoyez une candidature de test : elle doit arriver dans
   votre boîte e-mail et dans Formspree.

> La même méthode active déjà la newsletter : renseignez `data-endpoint` sur le
> formulaire `data-newsletter` de l'accueil.

Limite : les candidatures n'alimentent pas le tableau de bord coordinateur
(kanban, binômes). Pour ça, prenez la Route B.

---

## Route B — Supabase (pipeline complet + espace coordinateur)

À privilégier pour un suivi structuré : candidatures → étapes → binômes, le
tout dans `admin/`. Compte Supabase gratuit suffisant pour démarrer.

### 1. Créer le projet et la base
1. Créez un projet sur https://supabase.com.
2. Ouvrez **SQL Editor**, collez le contenu de `supabase-schema.sql` **en
   entier** (il inclut la section « Phase 2b » qui ouvre le dépôt public), puis
   exécutez. Les tables et les règles de sécurité sont créées.

### 2. Brancher le site
1. Dans Supabase → **Project Settings → API**, copiez :
   - **Project URL** (ex. `https://abcd1234.supabase.co`)
   - clé **anon public**
2. Ouvrez `assets/supabase-config.js` et renseignez :
   ```js
   window.RACP_SUPABASE = {
     url:  "https://abcd1234.supabase.co",
     anon: "votre_cle_anon_public"
   };
   ```
   Ce seul fichier suffit : il alimente les formulaires **et** `admin/`.
3. Publiez. Une candidature de test doit créer une ligne dans la table
   `mentor_applications` ou `mentee_applications` (Supabase → Table Editor).

### 3. Créer le compte coordinateur
Le tableau de bord est protégé : seules les personnes ayant le rôle
`coordinateur` peuvent lire les candidatures.
1. Supabase → **Authentication → Users → Add user** : créez l'utilisateur avec
   l'e-mail du coordinateur (connexion par lien magique, sans mot de passe).
2. Supabase → **SQL Editor**, créez son profil coordinateur (remplacez
   l'e-mail) :
   ```sql
   insert into profiles (id, role, nom)
   select id, 'coordinateur', 'Coordination RACP-IMSP'
   from auth.users where email = 'coordinateur@exemple.org'
   on conflict (id) do update set role = 'coordinateur';
   ```
3. Ouvrez `admin/`, saisissez l'e-mail, cliquez « Recevoir le lien de
   connexion », ouvrez le lien reçu : vous revenez sur le tableau de bord, en
   mode réel (le bandeau « Mode démo » disparaît).

### Ce que fait l'espace coordinateur
- **Tableau de bord** : volumes et entonnoir par étape.
- **Candidatures** : kanban ; changez l'étape d'une candidature → c'est
  enregistré en base.
- **Binômes** : mise en relation mentor/filleul avec suggestion automatique.
- **Membres** : annuaire.

---

## Bon à savoir

- **Sécurité** : la clé `anon` est faite pour vivre côté navigateur ; ce sont
  les règles RLS (dans le schéma) qui protègent les données. Le public peut
  **déposer** une candidature mais **jamais lire** celles des autres.
- **Anti-spam (production)** : le dépôt public étant ouvert, ajoutez à terme un
  captcha (hCaptcha/Cloudflare Turnstile) ou un rate-limit via une Edge
  Function Supabase.
- **Mineur·e·s** : le formulaire filleul comporte la case d'autorisation
  parentale ; pensez au volet RGPD pour les données de mineurs.
- **Bascule de mode** : videz `assets/supabase-config.js` pour repasser en
  Formspree/démo à tout moment, sans toucher au reste du site.
