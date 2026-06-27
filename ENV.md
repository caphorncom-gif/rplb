# Variables d'Environnement

Créez un fichier `.env` à la racine du projet avec les variables suivantes :

```env
# Supabase
VITE_SUPABASE_URL=https://hgcpddzpqzfxrvfipsii.supabase.co
VITE_SUPABASE_ANON_KEY=votre_cle_anonyme_ici

# Site
VITE_SITE_URL=https://www.rplb-electricite.fr
VITE_COMPANY_NAME=RPLB Électricité

# Contact
VITE_CONTACT_EMAIL=contact@rplb-electricite.fr
VITE_CONTACT_PHONE=07 86 17 22 82
VITE_URGENCE_PHONE=07 85 54 70 68

# Localisation
VITE_BUSINESS_ADDRESS=Longueil-Sainte-Marie, 60126
VITE_BUSINESS_LAT=49.2667
VITE_BUSINESS_LNG=2.8833

# Tracking (caphorncom.fr)
VITE_TRACKING_ENABLED=true
VITE_TRACKING_API_URL=https://api.caphorncom.fr/tracking
VITE_TRACKING_SITE_ID=rplb-electricite
```

## Configuration Supabase

1. Créez un projet sur https://supabase.com
2. Exécutez le fichier `supabase-schema-rplb.sql` dans l'éditeur SQL de Supabase
3. Créez un bucket de stockage nommé `rplb-media` avec les politiques publiques en lecture
4. Copiez l'URL et la clé anonyme dans votre fichier `.env`

## Notes

- Toutes les variables doivent commencer par `VITE_` pour être accessibles dans le code
- Le fichier `.env` est ignoré par Git pour des raisons de sécurité
- En production (Vercel), ajoutez ces variables dans les paramètres du projet

