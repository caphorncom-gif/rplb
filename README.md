# RPLB Électricité - Site Web

Site web professionnel pour RPLB Électricité, électricien basé à Longueil-Sainte-Marie dans l'Oise.

## 🚀 Technologies

- **React 19** + **TypeScript**
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Supabase** - Backend & Database
- **Lucide React** - Icons

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Copier le fichier .env.example en .env
cp .env.example .env

# Remplir les variables d'environnement dans .env
```

## 🔧 Configuration

### Variables d'environnement (.env)

1. Créer un projet Supabase sur https://supabase.com
2. Exécuter le schema SQL fourni dans `supabase-schema-rplb.sql`
3. Remplir les variables dans `.env` avec vos clés Supabase

### Supabase Schema

Le fichier SQL contenant le schema complet de la base de données doit être exécuté dans l'éditeur SQL de Supabase. Il contient :
- Tables (pages, services, realisations, testimonials, articles, etc.)
- Row Level Security (RLS) policies
- Données initiales

## 🛠️ Développement

```bash
# Démarrer le serveur de développement
npm run dev

# Build de production
npm run build

# Preview du build
npm run preview
```

## 📁 Structure

```
src/
├── components/      # Composants réutilisables
├── pages/          # Pages du site
├── lib/            # Utilitaires (Supabase, etc.)
└── assets/         # Images, etc.
```

## 🌐 Déploiement

### Vercel (Recommandé)

1. Connecter le repo GitHub à Vercel
2. Ajouter les variables d'environnement dans Vercel
3. Déployer automatiquement

```bash
# Ou via CLI
npm install -g vercel
vercel
```

### Configuration DNS

Une fois déployé sur Vercel, ajouter le domaine dans Vercel Dashboard et configurer les DNS chez votre registrar.

## 📝 Notes

- Le site est optimisé pour le SEO local
- Schema.org JSON-LD inclus pour le référencement
- Responsive design (mobile-first)
- Optimisé pour la conversion (CTAs, formulaires)

## 📄 License

Propriétaire - RPLB Électricité
