# 🚀 Guide de Déploiement sur OVH

## 📋 Modifications Effectuées

### Fichiers Modifiés
- ✅ `src/pages/LocalLanding.tsx` : Ajout de LocalBusiness Schema, FAQ Schema, liens internes

### Fichiers de Documentation (pas besoin de build)
- `PLAN-ACTION-SEO-GOOGLE-SEARCH-CONSOLE.md`
- `ACTIONS-IMMEDIATES-SEO.md`
- `DEPLOIEMENT-OVH.md`

---

## 🔧 Étapes de Build et Déploiement

### 1. Build du Projet

```bash
# Depuis le répertoire du projet
cd "/Users/kevin/Documents/RPLC - new site/rplb-electricite"

# Générer le sitemap (important pour le SEO)
npm run sitemap

# Build de production
npm run build
```

**Vérification :**
- Le dossier `dist/` doit contenir tous les fichiers
- Vérifiez que `dist/sitemap.xml` est présent et à jour

### 2. Préparer les Fichiers pour OVH

**Fichiers à uploader sur OVH :**
- Tout le contenu du dossier `dist/`
- Le fichier `.htaccess` (doit être dans la racine du site)

**Structure attendue sur OVH :**
```
/
├── index.html
├── .htaccess
├── sitemap.xml
├── robots.txt
├── assets/
│   ├── index-*.js
│   ├── index-*.css
│   └── ...
└── ...
```

### 3. Upload sur OVH

**Méthode 1 : FTP/SFTP**
1. Connectez-vous à votre espace OVH via FTP
2. Naviguez vers le répertoire `www` ou `public_html`
3. Uploadez tous les fichiers du dossier `dist/`
4. Vérifiez que `.htaccess` est bien présent

**Méthode 2 : FileZilla ou autre client FTP**
1. Ouvrez FileZilla
2. Connectez-vous à votre serveur OVH
3. Uploadez le contenu de `dist/` vers la racine du site

**Méthode 3 : OVH Manager (si disponible)**
1. Connectez-vous à votre espace OVH
2. Utilisez le gestionnaire de fichiers
3. Uploadez les fichiers

### 4. Vérifications Post-Déploiement

**✅ Vérifier que le site fonctionne :**
1. Visitez : `https://www.rplb-electricite.fr`
2. Testez quelques pages :
   - Page d'accueil
   - Une landing page locale : `/electricien/compiegne`
   - Vérifiez que la section FAQ apparaît
   - Vérifiez que les liens vers les autres communes fonctionnent

**✅ Vérifier le Structured Data :**
1. Utilisez : https://search.google.com/test/rich-results
2. Testez une landing page : `https://www.rplb-electricite.fr/electricien/compiegne`
3. Vérifiez que vous voyez :
   - ✅ LocalBusiness Schema
   - ✅ FAQPage Schema
   - ✅ BreadcrumbList Schema

**✅ Vérifier le Sitemap :**
1. Visitez : `https://www.rplb-electricite.fr/sitemap.xml`
2. Vérifiez qu'il contient bien 93 URLs
3. Vérifiez que les landing pages locales sont présentes

**✅ Vérifier les Core Web Vitals :**
1. Utilisez : https://pagespeed.web.dev/
2. Testez votre page d'accueil
3. Vérifiez les scores (objectif : > 90)

---

## 🎯 Checklist de Déploiement

- [ ] `npm run sitemap` exécuté avec succès
- [ ] `npm run build` exécuté sans erreurs
- [ ] Dossier `dist/` contient tous les fichiers
- [ ] `.htaccess` est présent dans `dist/`
- [ ] `sitemap.xml` est présent dans `dist/`
- [ ] Fichiers uploadés sur OVH
- [ ] Site accessible en ligne
- [ ] Landing pages locales fonctionnent
- [ ] Section FAQ visible sur les landing pages
- [ ] Structured Data validé avec Rich Results Test
- [ ] Sitemap accessible et à jour

---

## 🚨 Problèmes Courants

### Le site ne fonctionne pas après déploiement

**Solutions :**
1. Vérifiez que `index.html` est bien à la racine
2. Vérifiez que `.htaccess` est présent
3. Vérifiez les permissions des fichiers (644 pour les fichiers, 755 pour les dossiers)
4. Vérifiez les logs d'erreur OVH

### Les routes React ne fonctionnent pas

**Solution :**
- Vérifiez que `.htaccess` contient bien les règles de rewrite pour React Router
- Vérifiez que `mod_rewrite` est activé sur votre serveur OVH

### Le sitemap n'est pas accessible

**Solution :**
- Vérifiez que `sitemap.xml` est bien uploadé
- Vérifiez les permissions (644)
- Testez l'URL directement : `https://www.rplb-electricite.fr/sitemap.xml`

---

## 📝 Commandes Rapides

```bash
# Build complet (sitemap + build)
npm run sitemap && npm run build

# Vérifier le contenu de dist/
ls -la dist/

# Vérifier la taille du build
du -sh dist/
```

---

## ✅ Après le Déploiement

Une fois le site déployé :

1. **Forcer l'indexation dans Google Search Console**
   - Utilisez Inspection d'URL pour indexer les nouvelles pages

2. **Vérifier les Structured Data**
   - Testez avec Rich Results Test

3. **Vérifier les performances**
   - Testez avec PageSpeed Insights

4. **Soumettre le sitemap**
   - Vérifiez dans Google Search Console que le sitemap est à jour

---

**Temps estimé : 15-30 minutes**

Bon déploiement ! 🚀
