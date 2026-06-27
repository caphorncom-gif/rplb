# Guide d'Administration Supabase

Ce guide explique comment utiliser les scripts d'administration pour interagir avec votre base de données Supabase.

## 📋 Prérequis

1. **Variables d'environnement configurées** dans votre fichier `.env` :
   ```env
   VITE_SUPABASE_URL=https://hgcpddzpqzfxrvfipsii.supabase.co
   VITE_SUPABASE_ANON_KEY=votre_cle_anonyme
   ```

2. **Dépendances installées** :
   ```bash
   npm install
   ```

## 🛠️ Scripts Disponibles

### 1. Script d'Administration (`supabase-admin.js`)

Script principal pour gérer les données Supabase.

#### Commandes disponibles :

**Lister les éléments d'une table :**
```bash
npm run db:admin list articles
npm run db:admin list services
npm run db:admin list realisations
npm run db:admin list testimonials
npm run db:admin list contact_requests
```

**Obtenir un élément spécifique :**
```bash
npm run db:admin get articles [id]
npm run db:admin get services [id]
```

**Mettre à jour un élément :**
```bash
npm run db:admin update articles [id]
# Puis entrez les modifications au format JSON, ex:
# {"title": "Nouveau titre", "is_published": true}
```

**Supprimer un élément :**
```bash
npm run db:admin delete articles [id]
```

**Insérer un nouvel élément :**
```bash
npm run db:admin insert articles
# Puis entrez les données au format JSON
```

**Afficher les statistiques :**
```bash
npm run db:stats
# ou
npm run db:admin stats
```

### 2. Script de Requête Interactive (`supabase-query.js`)

Permet d'interroger la base de données de manière interactive.

```bash
npm run db:query
```

Le script vous demandera :
- Quelle table interroger
- Quels filtres appliquer
- La limite de résultats
- L'ordre de tri

## 📝 Exemples d'Utilisation

### Exemple 1 : Lister tous les articles publiés

```bash
npm run db:admin list articles
```

### Exemple 2 : Mettre à jour un article

```bash
npm run db:admin update articles abc123-def456-ghi789
```

Puis entrez :
```json
{"title": "Nouveau titre", "is_published": true, "meta_description": "Nouvelle description"}
```

### Exemple 3 : Créer un nouvel article

```bash
npm run db:admin insert articles
```

Puis entrez :
```json
{
  "slug": "nouvel-article",
  "title": "Mon Nouvel Article",
  "content": "Contenu de l'article...",
  "excerpt": "Résumé de l'article",
  "category": "Conseils",
  "tags": ["conseils", "installation"],
  "author": "RPLB Électricité",
  "is_published": true,
  "published_at": "2024-01-15T10:00:00Z"
}
```

### Exemple 4 : Vérifier les statistiques

```bash
npm run db:stats
```

## 🔒 Sécurité

⚠️ **Important** : Ces scripts utilisent la **clé anonyme** (ANON_KEY), qui est limitée par les politiques RLS (Row Level Security) de Supabase.

- ✅ **Lecture** : Fonctionne pour toutes les tables publiques
- ✅ **Écriture** : Fonctionne seulement si les politiques RLS le permettent
- ⚠️ **Suppression** : Peut être limitée selon les politiques

Pour des opérations administratives complètes, vous devrez peut-être utiliser la clé **SERVICE_ROLE** (jamais dans le code client !).

## 🚀 Utilisation avec l'IA (Auto)

Je peux utiliser ces scripts pour vous aider à :

1. **Lister les données** : Voir ce qui est dans votre base
2. **Modifier les données** : Mettre à jour des articles, services, etc.
3. **Créer du contenu** : Insérer de nouveaux articles, réalisations
4. **Analyser** : Vérifier les statistiques et la cohérence des données

**Comment ça marche** :
- Vous me demandez une modification (ex: "Met à jour l'article X")
- Je modifie le script ou crée une commande
- Vous exécutez la commande
- Les modifications sont appliquées dans Supabase

## 📚 Tables Disponibles

- `articles` : Articles de blog
- `services` : Services proposés
- `realisations` : Réalisations clients
- `testimonials` : Avis clients
- `contact_requests` : Demandes de contact
- `pages` : Pages du site
- `certifications` : Certifications
- `site_settings` : Paramètres du site

## 🐛 Dépannage

**Erreur "Variables d'environnement manquantes"** :
- Vérifiez que votre fichier `.env` existe et contient `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY`

**Erreur "Permission denied"** :
- Vérifiez les politiques RLS dans Supabase
- Certaines opérations nécessitent la clé SERVICE_ROLE

**Erreur "Table not found"** :
- Vérifiez que la table existe dans Supabase
- Vérifiez l'orthographe du nom de table

## 📖 Commandes Rapides

```bash
# Statistiques
npm run db:stats

# Lister articles
npm run db:admin list articles

# Lister services
npm run db:admin list services

# Requête interactive
npm run db:query
```

