# 🚀 Guide Post-Lancement - Démarches Essentielles

## 📍 1. Google Search Console

### URL du Sitemap

**Adresse du sitemap à ajouter dans Google Search Console :**
```
https://www.rplb-electricite.fr/sitemap.xml
```

### Étapes pour Google Search Console

1. **Créer un compte** (si vous n'en avez pas) : https://search.google.com/search-console
2. **Ajouter votre propriété** (site web)
   - Entrez : `https://www.rplb-electricite.fr`
   - Choisissez la méthode de vérification (recommandé : balise HTML ou fichier HTML)
3. **Soumettre le sitemap**
   - Dans le menu de gauche → **Sitemaps**
   - Entrez : `sitemap.xml`
   - Cliquez sur **Envoyer**
4. **Vérifier l'indexation**
   - Attendez quelques jours
   - Vérifiez dans **Couverture** que les pages sont indexées

---

## 🔍 2. Google My Business (GMB)

**ESSENTIEL pour le référencement local !**

1. **Créer ou réclamer votre fiche** : https://www.google.com/business/
2. **Remplir les informations** :
   - Nom : RPLB Électricité
   - Adresse : Longueil-Sainte-Marie, 60126
   - Téléphone : Romain Pagnier (07 86 17 22 82) et Ludovic Bozo (07 85 54 70 68)
   - Catégorie : Électricien
   - Horaires : Lun-Ven 8h-18h, Samedi Fermé
   - Site web : https://www.rplb-electricite.fr
3. **Vérifier votre établissement** (par téléphone ou courrier)
4. **Ajouter des photos** de vos réalisations
5. **Demander des avis** à vos clients (important !)

---

## 📊 3. Analytics et Suivi

### Google Analytics 4 (GA4)

1. **Créer un compte** : https://analytics.google.com
2. **Créer une propriété** pour votre site
3. **Récupérer l'ID de mesure** (G-XXXXXXXXXX)
4. **Ajouter le code de suivi** dans votre site (déjà intégré avec tracking.ts)

### Vérifier le Tracking

- Ouvrez la console du navigateur (F12)
- Vérifiez qu'il n'y a pas d'erreurs
- Testez les conversions (formulaires, appels)

---

## 📱 4. Réseaux Sociaux

### Facebook Business

1. **Créer une page Facebook** pour RPLB Électricité
2. **Ajouter le lien** vers votre site web
3. **Partager régulièrement** vos réalisations
4. **Ajouter le lien Facebook** dans le footer (déjà fait)

### Autres plateformes

- **LinkedIn** : Créer une page entreprise (optionnel)
- **Instagram** : Pour partager des photos de réalisations (optionnel)

---

## ✅ 5. Vérifications Techniques

### Vérifier que les fichiers sont bien uploadés

- [ ] `sitemap.xml` accessible : https://www.rplb-electricite.fr/sitemap.xml
- [ ] `robots.txt` accessible : https://www.rplb-electricite.fr/robots.txt
- [ ] `.htaccess` présent et fonctionnel

### Tester les fonctionnalités

- [ ] Toutes les pages se chargent correctement
- [ ] Le formulaire de contact fonctionne
- [ ] Les liens cliquables fonctionnent
- [ ] Les images s'affichent correctement
- [ ] Le site est responsive (mobile, tablette, desktop)
- [ ] Supabase fonctionne (pas d'erreurs dans la console)

### Performance

- [ ] Tester sur **PageSpeed Insights** : https://pagespeed.web.dev/
- [ ] Optimiser les images si nécessaire
- [ ] Vérifier le temps de chargement

---

## 🔗 6. Backlinks et Citations Locales

### Annuaires professionnels

Inscrire votre entreprise sur :
- **PagesJaunes** : https://www.pagesjaunes.fr
- **Yelp** : https://www.yelp.fr
- **Mappy** : https://www.mappy.com
- **Annuaires locaux** de l'Oise
- **Annuaire des artisans** (Qualifelec, etc.)

### Citations locales

- Même nom, adresse, téléphone partout
- Cohérence avec Google My Business

---

## 📝 7. Contenu et SEO

### Blog

- **Publier régulièrement** des articles (au moins 1-2 par mois)
- **Articles SEO** déjà intégrés : vérifier qu'ils s'affichent bien
- **Partager** sur les réseaux sociaux

### Réalisations

- **Ajouter régulièrement** de nouvelles réalisations
- **Utiliser des photos** de qualité
- **Remplir les descriptions** avec mots-clés locaux

---

## 📞 8. Appels à l'Action

### Suivre les conversions

- **Formulaires** : Vérifier que les emails arrivent bien
- **Appels téléphoniques** : Tracker les appels depuis le site
- **Demander des avis** après chaque intervention

---

## 🎯 9. Checklist Complète

### Immédiat (J+0)
- [ ] Google Search Console : sitemap soumis
- [ ] Google My Business : fiche créée/vérifiée
- [ ] Vérifier que le site fonctionne
- [ ] Tester le formulaire de contact

### Court terme (J+1 à J+7)
- [ ] Google Analytics configuré et vérifié
- [ ] PagesJaunes : inscription
- [ ] Demander des avis Google à vos clients
- [ ] Partager le site sur les réseaux sociaux

### Moyen terme (J+7 à J+30)
- [ ] Publier 1-2 articles de blog
- [ ] Ajouter 3-5 nouvelles réalisations
- [ ] Vérifier l'indexation Google
- [ ] Optimiser selon les retours

### Long terme (Mois 2+)
- [ ] Analyser les performances (Analytics)
- [ ] Ajuster le SEO selon les données
- [ ] Continuer à publier du contenu
- [ ] Maintenir une présence active

---

## 🔧 10. Fichiers Importants sur le Serveur

Assurez-vous que ces fichiers sont bien sur votre serveur OVH :

- ✅ `index.html`
- ✅ `assets/` (dossier complet)
- ✅ `.htaccess` (pour React Router)
- ✅ `sitemap.xml` (dans public/, copié à la racine)
- ✅ `robots.txt` (dans public/, copié à la racine)

---

## 📊 11. Monitoring

### Outils de suivi recommandés

- **Google Search Console** : Position, indexation, erreurs
- **Google Analytics** : Visiteurs, conversions, comportement
- **PageSpeed Insights** : Performance
- **Google My Business Insights** : Recherches locales, appels

### KPI à suivre

- Nombre de visites
- Taux de rebond
- Pages vues
- Conversions (formulaires, appels)
- Position dans Google
- Avis Google

---

## 🆘 12. Support et Maintenance

### En cas de problème

1. **Vérifier la console** du navigateur (F12)
2. **Vérifier les logs** dans Google Search Console
3. **Contacter OVH** si problème serveur
4. **Vérifier Supabase** si problème de données

### Mises à jour régulières

- **Contenu** : Ajouter réalisations, articles
- **Photos** : Mettre à jour la galerie
- **Avis** : Demander régulièrement des avis
- **SEO** : Optimiser selon les données Analytics

---

## 📞 13. Contacts Utiles

- **OVH Support** : https://www.ovh.com/support/
- **Google Search Console** : https://search.google.com/search-console
- **Google My Business** : https://www.google.com/business/

---

**Bon référencement ! 🚀**

*N'hésitez pas à revenir vers nous si vous avez besoin d'aide pour l'une de ces étapes.*

