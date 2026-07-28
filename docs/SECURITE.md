# SÉCURITÉ — RACP-IMSP

Récapitulatif du durcissement appliqué au site, et points de vigilance
pour la mise en production. Aucun changement fonctionnel : le mode
démonstration, Formspree et Supabase fonctionnent comme avant.

---

## 1. Correction principale : XSS stocké dans l'espace coordinateur

**Avant.** `admin/index.html` injectait directement dans le HTML les données
issues de la base (`nom`, `expertise`, `filière`, `pays`…). Or ces valeurs
proviennent des **formulaires publics** : une personne malveillante pouvait
soumettre une candidature dont le « nom » contenait du code
(`<img src=x onerror=…>`) qui s'exécutait ensuite dans le navigateur du
coordinateur connecté — avec sa session Supabase.

**Après.** Le script a été externalisé (`admin/app.js`) et **toute valeur
dynamique passe par `esc()`** (échappement HTML) ou `num()` (entier sûr)
avant insertion. Les valeurs d'étape du kanban sont validées contre la
liste `ETAPES` avant toute mise à jour en base.

## 2. Espace coordinateur : session réellement exigée

Avant, saisir un e-mail affichait l'interface même sans lien magique validé.
Désormais, le **mode réel exige une session Supabase valide**
(`auth.getSession()`), sinon bascule en démonstration. Le bouton « Quitter »
appelle aussi `auth.signOut()`. Les `alert()` ont été remplacés par des
messages intégrés à l'écran de connexion.

> Rappel important : sur un site statique, l'écran de connexion n'est pas
> une barrière en soi. **La vraie protection des données est la RLS
> (Row Level Security) de Supabase**, déjà activée dans
> `supabase-schema.sql`. Vérifiez que les politiques n'autorisent en
> lecture que les coordinateurs authentifiés.

## 3. Content Security Policy (CSP) sur toutes les pages

Chaque page contient une balise `<meta http-equiv="Content-Security-Policy">`
qui limite les scripts à `self` + `cdn.jsdelivr.net` (SDK Supabase),
les connexions à Formspree/Supabase, les iframes à `youtube-nocookie.com`,
et interdit `object-src`. Le petit script inline commun est autorisé par
son empreinte `sha256` ; le grand script de `ressources.html` a été
**externalisé** (`ressources.js`) pour rester compatible.

En complément, `_headers` (Netlify / Cloudflare Pages) et `vercel.json`
ajoutent les en-têtes que les balises meta ne peuvent pas porter :
`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`,
`Permissions-Policy`, `COOP`, `HSTS`. Sur GitHub Pages, ces en-têtes
ne sont pas configurables : les balises meta CSP restent actives.

## 4. Formulaires publics durcis (`script.js`)

- **Honeypot anti-spam** : un champ caché `_gotcha` est ajouté à chaque
  formulaire (Formspree rejette les soumissions où il est rempli), doublé
  d'un contrôle de délai (soumission < 2,5 s = robot). Les robots reçoivent
  un faux écran de succès (leurre silencieux).
- **Validation e-mail renforcée** (regex, en plus de `type=email`).
- **Liste blanche des colonnes** avant tout envoi à Supabase : les champs
  inattendus sont écartés, les entiers sont bornés (`dispo_h` ≤ 40,
  `capacite` ≤ 10), les chaînes nettoyées et limitées en longueur.
- **SDK Supabase épinglé** en version majeure (`@supabase/supabase-js@2`)
  au lieu de « latest » — évite qu'une future version majeure ou un
  paquet compromis soit chargé automatiquement.
- Les `alert()` sont remplacés par des messages d'état accessibles
  (`role="alert"`) intégrés aux formulaires.

## 5. Divers

- `rel="noopener noreferrer"` garanti sur tous les liens `target="_blank"`.
- `robots.txt` : `Disallow: /admin/` (en plus du `noindex` existant).
- `<meta name="referrer" content="strict-origin-when-cross-origin">` partout.

## 6. Check-list avant mise en production

1. **Supabase** : vérifier les politiques RLS (lecture des candidatures
   réservée aux coordinateurs ; insertion publique limitée aux colonnes
   attendues). Ne jamais mettre la clé `service_role` côté client —
   seule la clé `anon` va dans `assets/supabase-config.js`.
2. **Formspree** : remplacer les `VOTRE_ID_…` par les vrais identifiants.
3. **Domaine** : remplacer `VOTRE-DOMAINE` dans `robots.txt` et `sitemap.xml`.
4. **HTTPS** : activer « Enforce HTTPS » chez l'hébergeur (HSTS est déjà
   dans `_headers` / `vercel.json` pour Netlify, Cloudflare Pages, Vercel).
5. Si vous ajoutez un jour un script tiers, pensez à l'ajouter à la CSP.
