# 🚀 Commandes Simples pour Déployer

## ⚠️ Important

**Ne copiez PAS les commentaires (#)** - ce sont juste des explications.

## 📋 Commandes à exécuter une par une

### 1. Aller dans le dossier
```bash
cd "/Users/kevin/Documents/RPLC - new site/rplb-electricite"
```

### 2. Se connecter à Supabase
```bash
supabase login
```
**Action :** Appuyez sur **Entrée** quand demandé. Cela ouvrira votre navigateur.

### 3. Lier le projet
```bash
supabase link --project-ref hgcpddzpqzfxrvfipsii
```

### 4. Déployer la fonction
```bash
supabase functions deploy send-contact-email
```

## 🔄 Ou utilisez le script automatique

```bash
cd "/Users/kevin/Documents/RPLC - new site/rplb-electricite"
bash deploy-function.sh
```

## ❓ Réponse à votre question

**Non, je ne peux pas me connecter directement à Supabase** car :
- Cela nécessite une authentification interactive (ouverture du navigateur)
- Cela nécessite votre compte Supabase
- C'est une opération sécurisée qui doit être faite manuellement

**Mais je peux :**
- ✅ Créer les fichiers nécessaires
- ✅ Vous donner les commandes exactes
- ✅ Créer des scripts pour automatiser
- ✅ Vous aider à résoudre les erreurs

## 🎯 Prochaines étapes

1. **Terminez la connexion** : Dans votre terminal où `supabase login` est en cours, appuyez sur **Entrée**
2. **Autorisez dans le navigateur** : Connectez-vous à Supabase dans la fenêtre qui s'ouvre
3. **Continuez avec les autres commandes** : Une fois connecté, exécutez les commandes 3 et 4

## ✅ Vérification

Après le déploiement, testez le formulaire de contact sur votre site. L'erreur CORS devrait être résolue !

