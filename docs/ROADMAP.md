# Feuille de route — RACP-IMSP

> Document de travail de l'équipe (4 développeurs). Préparé pour la réunion du
> **1ᵉʳ août 2026**. État technique vérifié dans le code le **31 juillet 2026**.
> À mettre à jour après chaque réunion.

---

## 0. À traiter avant tout le reste (10 min) 🔴

**Un merge mal résolu a été commité et poussé sur `origin/Serge`.** Les marqueurs
de conflit (`<<<<<<<`, `=======`, `>>>>>>>`) se sont retrouvés **dans les fichiers
du site**, dont `ressources.js` — qui ne s'exécutait plus du tout (`SyntaxError`).
Conséquence : **la page Ressources était entièrement vide** (aucune carte, aucun
compteur, aucun filtre).

- **Introduit par :** commit `e23064d`, propagé jusqu'à `045e74b`, **poussé sur GitHub**.
- **Fichiers touchés :** `ressources.js` (4 conflits), `docs/CHECKLIST.md` (19),
  `README.md` (3), `docs/CORRECTIONS.md` (3).
- **Réparé le 31/07** : conflits résolus en gardant la version à jour ; vérifié
  qu'**aucune ressource du catalogue n'a été perdue** (mêmes 29 titres des deux côtés).
  Contrôle après réparation : 54 cartes, compteurs 54 · 5 · 39, aucune erreur console.

### Ce que ça nous dit — point d'agenda

Ce n'est pas une erreur individuelle, c'est un **trou dans le processus** : rien
n'empêche aujourd'hui de pousser du code cassé sur la branche que tout le monde
utilise. À 4 développeurs, ça se reproduira.

**Décisions à prendre (§ 4.3)** : convention de branches, relecture avant fusion,
et une vérification automatique minimale.

**Réflexe à adopter dès demain**, avant tout `git add` après un merge :

```bash
git status                     # y a-t-il des fichiers "both modified" ?
git diff --check               # signale les marqueurs de conflit
grep -rn '^<<<<<<< ' --exclude-dir=.git .
node --check ressources.js && node --check script.js
```

---

## 1. Où en est le site (vérifié le 31/07)

Site **100 % statique** : 18 pages HTML, ~1 900 lignes de JS/CSS, aucun build,
aucune dépendance à installer. Déployable tel quel.

### Ce qui est solide ✅

| Domaine | État |
|---|---|
| Structure | 18 pages, **aucun lien interne cassé**, page 404 complète |
| Liens externes | **54 URL testées, toutes valides** |
| Assets | tous présents ; **toutes les images ont un `alt`** |
| SEO / mobile | canonique + `og:url` + `og:image` absolue + `manifest.json` sur les 17 pages publiques |
| Sécurité | CSP **identique sur les 18 pages**, `_headers` + `vercel.json`, honeypot anti-spam |
| Espace `admin/` | hors des pieds de page, `noindex` + `Disallow` + `X-Robots-Tag` |
| Bibliothèque | 54 ressources, 0 doublon, compteurs justes (54 · 5 · 39) |

### Ce qui bloque la mise en ligne 🔴

1. **Formspree non branché** — 4 endpoints `VOTRE_ID_…` : **aucun formulaire ne part**
   (candidature parrain, candidature filleul, newsletter ×2, contact).
2. **Mentions légales incomplètes** — responsable de publication + hébergeur.
   *Obligation légale, pas un détail.*
3. **Contenus de démonstration en ligne** — chiffres inventés (200 alumni, 15 promotions…),
   portrait fictif « Amina K. », **4** articles marqués « démonstration », PDF d'annales
   placeholder de 3,7 Ko.
4. **Pas d'hébergement** — le site n'existe qu'en local.

Détail pas à pas dans [`CHECKLIST.md`](CHECKLIST.md).

---

## 2. Priorités proposées

| Priorité | Objectif | Pourquoi |
|---|---|---|
| **P0** | Assainir le dépôt et le processus Git | Sans ça, on perd du temps à réparer |
| **P1** | Ouvrir le site (hébergement + légal + formulaires) | Le site ne sert à rien tant qu'il n'est pas en ligne et qu'il ne reçoit rien |
| **P2** | Remplacer les contenus d'exemple | Crédibilité : des chiffres inventés décrédibilisent le réseau |
| **P3** | Phase 2 — Supabase + espace coordinateur | Utile seulement quand il y a de vraies candidatures à suivre |

> **Un site en ligne avec peu de contenu vaut mieux qu'un site parfait jamais publié** —
> mais pas avec de faux chiffres. D'où P1 puis P2 rapprochés.

---

## 3. Répartition proposée entre les 4 développeurs

Découpage pensé pour que **personne ne travaille sur les mêmes fichiers** — c'est ce
qui a causé l'incident du § 0.

### Lot A — Mise en ligne & infrastructure
**Fichiers :** `mentions-legales.html`, `_headers`, `vercel.json`, `robots.txt`, `sitemap.xml`, `README.md`

- Choisir l'hébergeur (**décision § 4.1**) et déployer.
- Brancher le domaine `racp-imsp.org` (DNS, HTTPS).
- Compléter les mentions légales avec les coordonnées **réelles** de l'hébergeur.
- Déclarer le site dans Google Search Console + soumettre le sitemap.
- Renseigner l'URL en ligne dans le README.

### Lot B — Formulaires & données personnelles
**Fichiers :** `devenir-parrain.html`, `devenir-filleul.html`, `contact.html`, `index.html`, `actualites.html`, `confidentialite.html`

- Créer les formulaires Formspree et coller les 4 endpoints.
- Tester **chaque** formulaire de bout en bout (l'e-mail de confirmation Formspree
  doit être validé, sinon rien n'est livré).
- Activer les réponses automatiques + la restriction de domaine.
- Relire `confidentialite.html` et l'aligner sur ce qu'on fait vraiment
  (qui reçoit, où c'est stocké, combien de temps).
- **Point de vigilance :** le formulaire filleul concerne des **mineur·e·s**
  (autorisation parentale) — la procédure de recueil doit être écrite.

### Lot C — Contenus réels
**Fichiers :** `index.html`, `parcours.html`, `actualites.html`, `article-*.html`, `assets/docs/`

- Remplacer les `data-count` de l'accueil (⚠️ chaque chiffre apparaît **deux fois**).
- Vrais portraits d'alumni (accueil + `parcours.html`).
- Écrire les **4** vrais articles, retirer les bannières « démonstration »,
  puis **les ajouter au `sitemap.xml`**.
- Remplacer le PDF d'annales placeholder.
- **Dépendance externe :** ces contenus viennent du bureau de l'association, pas des
  devs. → **à lancer dès demain**, c'est le chemin critique.

### Lot D — Qualité, outillage & phase 2
**Fichiers :** `.github/`, `docs/`, `assets/supabase-config.js`, `admin/`

- Mettre en place la convention Git retenue (§ 4.3).
- Script de vérification (liens morts, marqueurs de conflit, syntaxe JS) —
  la trame existe déjà, elle a servi à l'audit du 31/07.
- Passe d'accessibilité et de performance (les photos du campus vont jusqu'à 550 Ko).
- Préparer Supabase **sans le brancher** : projet, `supabase-schema.sql`, politiques RLS.

---

## 4. Décisions à prendre ensemble

### 4.1 Hébergeur — GitHub Pages ou Netlify / Vercel ?

**Ce n'est pas neutre :** GitHub Pages **ignore** `_headers` et `vercel.json`.
Les en-têtes de sécurité déjà écrits (`X-Frame-Options`, HSTS, `Referrer-Policy`,
`Permissions-Policy`) **ne s'appliqueraient pas**. Seules les balises CSP des pages
resteraient actives.

| | GitHub Pages | Netlify / Cloudflare Pages / Vercel |
|---|---|---|
| En-têtes de sécurité | ❌ ignorés | ✅ appliqués (fichiers déjà prêts) |
| Déploiement | push sur `main` | push ou glisser-déposer |
| Domaine perso + HTTPS | ✅ | ✅ |

→ **Recommandation : Netlify ou Cloudflare Pages.** Le travail de durcissement est
déjà fait, autant qu'il serve.

### 4.2 Formspree ou Supabase pour démarrer ?

Formspree : gratuit, 50 envois/mois, **archive de 30 jours seulement**.
Supabase : suivi complet des binômes, mais projet mis en pause après 7 jours d'inactivité.

→ **Recommandation : Formspree maintenant**, Supabase quand il y aura un vrai flux.
Attention au quota et à l'export mensuel des candidatures.

### 4.3 Convention Git (le vrai sujet de fond)

Proposition minimale, tenable à 4 :

- `main` = ce qui est en ligne. **Personne ne pousse dessus directement.**
- Une branche par lot : `feat/mise-en-ligne`, `feat/formulaires`, `feat/contenus`, `feat/qualite`.
- Fusion via **Pull Request**, relue par un·e autre dev.
- **Jamais** de `commit` juste après un merge sans avoir lancé les 4 commandes du § 0.

### 4.4 Le mode démo de l'espace coordinateur

Le bouton « Entrer en mode démonstration » est **ouvert à quiconque connaît l'adresse**
`/admin/`. Sans Supabase il n'expose que des données fictives — mais l'interface est
visible. À retirer le jour où Supabase est branché. **Qui décide, et quand ?**

---

## 5. Dette technique connue

Aucune n'empêche la mise en ligne. Détail en section 9 de [`CHECKLIST.md`](CHECKLIST.md).

- `docs/Matières.txt` : supprimé du disque mais encore suivi par Git ; toujours cité
  dans le README. → trancher : restaurer ou acter la suppression.
- Lien Exo7 en `http://` : le site n'a pas de HTTPS (certificat auto-signé).
  Rien à corriger de notre côté, mais certains navigateurs afficheront un avertissement.
- Photos du campus lourdes (jusqu'à 550 Ko). Le passage en WebP a été **testé et
  abandonné** le 28/07 (gain de 15 %, plusieurs images plus lourdes) — inutile d'y revenir.
- Couvertures des livres Dunod chargées depuis `dunod.com` : dépendance à un tiers,
  elles peuvent disparaître sans préavis.
- Le site pèse **30 Mo** depuis l'ajout du manuel d'Erickson (24 Mo). Voir la règle
  d'hébergement de fichiers en section 7 de la CHECKLIST avant d'en ajouter d'autres.

---

## 6. Ordre du jour proposé (60 min)

| Durée | Sujet |
|---|---|
| 10 min | § 0 — l'incident Git et ce qu'on en fait (§ 4.3) |
| 10 min | § 1 — état du site, questions |
| 15 min | § 4.1 et § 4.2 — hébergeur et formulaires : **décider** |
| 15 min | § 3 — qui prend quel lot, quelles échéances |
| 10 min | § 4.4 et § 5 — points ouverts, prochaine réunion |

**À obtenir absolument avant de partir :** un nom sur chaque lot, la date de mise en
ligne visée, et **qui va chercher les vrais contenus auprès du bureau** (chemin critique).
