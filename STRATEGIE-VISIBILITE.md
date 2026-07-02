# Stratégie de visibilité — RPLB Électricité

*Établie le 2 juillet 2026, sur données réelles Search Console + GA4 (28 derniers jours).*

## 1. Constat chiffré (pourquoi si peu de contacts)

| Indicateur (28 j) | Valeur | Lecture |
|---|---|---|
| Impressions Google | 44 | Le site est quasi invisible dans les résultats |
| Clics Google | 2 | …et les 2 clics viennent de la requête « rplb » (marque) |
| Sessions GA4 | 55 (dont 40 « Direct ») | L'essentiel du trafic = bots/visites techniques (Ashburn, Santa Clara…) |
| Conversions GA4 | 0 | Aucun événement de conversion ne remonte |
| Avis Google | 11 (note 5,0) | Bon capital confiance, volume trop faible |

**Le problème n'est pas d'abord le site : c'est qu'on ne le trouve pas.** Pour un électricien,
80 % des contacts « web » passent par le **pack local Google** (carte + 3 fiches) — pas par le
site. Le site convertit ceux qui vérifient, la fiche Google fait décrocher le téléphone.

Signaux positifs à exploiter :
- « depannage electricite compiegne » → position 1 (1 impression) : Google comprend la thématique.
- « rénovation électrique senlis » → position 16 : quick win à pousser en page 1.
- Les pages locales `/electricien/<ville>` commencent à sortir (Sacy-le-Grand, Senlis…).

## 2. Pilier n°1 — Google Business Profile (effort : faible, impact : maximal)

C'est LE levier de génération d'appels pour un artisan. À faire ce mois-ci :

1. **Optimiser la fiche** : catégorie principale « Électricien », catégories secondaires
   (dépannage électrique, installateur domotique…), zone desservie = les ~15 communes
   prioritaires, horaires, lien vers le site **avec UTM** (`?utm_source=google&utm_medium=gbp`),
   services détaillés (dépannage, tableau, mise aux normes, borne de recharge, domotique).
2. **Photos** : 2-3 photos de chantier par mois (avant/après tableau, installations). Les fiches
   avec photos récentes sortent nettement plus.
3. **Avis : passer de 11 à 30+** — c'est le facteur de classement local n°1.
   Routine simple : après chaque chantier, SMS avec le lien direct d'avis (ou QR code sur la
   facture). Objectif 2-3 avis/mois, en demandant au client de **mentionner sa commune et la
   prestation** (« rénovation tableau à Verberie ») — ces mots comptent pour le référencement.
4. **Répondre à 100 % des avis** (en citant la prestation/commune, même logique).
5. **1 post Google/mois** (réalisation récente, promo diagnostic, etc.).

## 3. Pilier n°2 — Technique : rendre le site lisible par Google

Le site est une SPA React rendue côté client : Google reçoit une page quasi vide et doit
exécuter le JS pour voir le contenu. Avec zéro autorité de domaine, c'est rédhibitoire.

- **Court terme (à faire vite)** : forcer l'unification `http://` → `https://www` en 301
  (GSC montre encore la propriété http qui capte 155 impressions vs 37 pour https —
  l'autorité est diluée entre les deux). Vérifier `vercel.json`/DNS après la bascule OVH → Vercel.
- **Moyen terme (recommandé)** : pré-rendre les pages clés en HTML statique
  (accueil, services, pages villes) — soit prerender au build (ex. `vite-plugin-prerender`),
  soit migration progressive vers **Astro** (conforme à la convention Cap Horn pour les
  vitrines où le SEO est clé). Les 70 pages villes n'ont aucune chance en rendu client.
- **Performance** : le bundle `icons` pèse 858 kB (import `* as LucideIcons` dans Home) —
  remplacer par des imports nommés + un mapping restreint. LCP mobile en dépend.
- **Schema.org** : vérifier le balisage `Electrician`/`LocalBusiness` (NAP identique à la fiche
  Google), `Service`, `Review` — déjà travaillé lors de l'audit du 27/06, à maintenir.

## 4. Pilier n°3 — Contenu local : moins de pages, plus de substance

70 pages villes quasi identiques = signal « contenu fin » pour Google.

- **Concentrer l'effort sur 10-15 communes prioritaires** (Compiègne, Senlis, Verberie,
  Pont-Sainte-Maxence, Crépy-en-Valois, Noyon, Longueil-Sainte-Marie…) : y ajouter du contenu
  réellement local — réalisations faites dans la commune, avis d'un client de la commune,
  spécificités (maisons anciennes du centre de Senlis, pavillons récents…).
- **Quick win immédiat** : renforcer `/electricien/senlis` (position 16 sur « rénovation
  électrique senlis ») — 300 mots spécifiques + une réalisation + un avis localisé.
- Le maillage interne est en place depuis la refonte (villes cliquables en accueil + footer).
- **Blog : 1 article/mois** sur des requêtes à intention forte : « prix rénovation électrique
  maison 100 m² », « tableau électrique aux normes NF C 15-100 : quand refaire ? », « borne de
  recharge à domicile dans l'Oise : prix et aides ». Chaque article renvoie vers le service et
  2-3 pages villes.

## 5. Pilier n°4 — Notoriété locale (backlinks + citations)

Le domaine n'a quasi aucun lien entrant. Objectif : 10-15 liens/citations locales en 6 mois.

- **Annuaires** : PagesJaunes, Yelp, annuaire CMA/CAPEB Oise, annuaires de mairies des communes
  desservies — avec un **NAP strictement identique** partout (nom, adresse, téléphone).
- **Partenaires** : demander un lien aux fournisseurs/partenaires (page « nos installateurs »).
- **Presse locale** : un portrait d'artisans dans la presse locale de Compiègne fournit le
  meilleur lien possible *(Recto Verso Magazine est tout indiqué — portrait « deux artisans,
  25 ans de métier » + lien vers le site)*.

## 6. Pilier n°5 — Conversion & mesure (fait / à suivre)

- ✅ **Refonte design (cette branche)** : téléphone cliquable dans le header et le bandeau haut,
  barre d'appel fixe sur mobile, preuves sociales (5,0 Google, décennale) dès le hero,
  hiérarchie claire appel > devis.
- **À configurer dans GA4** : marquer `phone_call` (clic `tel:`) et `contact_form` comme
  **conversions** (aujourd'hui : 0 conversion remontée, donc pilotage impossible).
- **Suivi mensuel** : `node scripts/gsc-report.mjs` + `node scripts/ga4-report.mjs`
  (impressions locales, clics, appels, formulaires, avis). Décision d'ajuster à M+3.

## 7. Option accélérateur — Google Ads local

Si besoin de contacts avant que le SEO porte (3-6 mois) : campagne Search géolocalisée
« électricien / dépannage électrique + communes », 150-300 €/mois, landing = accueil ou page
ville. Couper dès que le pack local génère assez d'appels.

## Calendrier 90 jours

| Quand | Action |
|---|---|
| Semaine 1 | GBP optimisé + UTM · routine avis lancée · conversions GA4 configurées · 301 http→https |
| Mois 1 | Page Senlis renforcée · 5 annuaires (NAP identique) · 1er article blog · photos GBP |
| Mois 2 | Prérendu/SSG des pages clés · 5 pages villes prioritaires enrichies · 2e article · contact presse locale |
| Mois 3 | 5 pages villes suivantes · bilan chiffré (scripts) · décision Google Ads |

**Objectif à 6 mois** : 500+ impressions/mois locales, 25-40 clics/mois, 30+ avis Google,
et surtout **5-10 contacts entrants/mois** (appels + formulaires) mesurés dans GA4.
