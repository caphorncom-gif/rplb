# 📋 Configuration DKIM dans OVH

## ⚠️ Formulaire OVH spécifique pour DKIM

OVH a un formulaire complexe pour DKIM. Pour Resend, on a juste besoin d'un enregistrement TXT simple.

## ✅ Solution : Utiliser un enregistrement TXT manuel (RECOMMANDÉ)

Le formulaire DKIM d'OVH est trop complexe pour Resend. **Utilisez plutôt un enregistrement TXT manuel** :

### Étape 1 : Annuler le formulaire DKIM

Cliquez sur **"Annuler"** pour quitter le formulaire DKIM.

### Étape 2 : Ajouter un enregistrement TXT manuel

1. Dans votre zone DNS OVH, cliquez sur **"Ajouter une entrée"**
2. Sélectionnez **"TXT"** (pas DKIM)
3. Remplissez :
   - **Sous-domaine** : `resend._domainkey`
   - **TTL** : Par défaut
   - **Valeur** : Copiez la valeur complète depuis Resend (commence par `p=MIGfMAOGCSqGSIb3DQEB...`)

### Étape 3 : Valeur à copier depuis Resend

Dans Resend Dashboard > Domains > votre domaine > DKIM :
- Copiez **TOUTE la valeur** qui commence par `p=MIGfMAOGCSqGSIb3DQEB...`
- Elle est généralement très longue (plusieurs lignes)
- Collez-la complètement dans le champ "Valeur" de l'enregistrement TXT

## 🔍 Exemple de valeur DKIM

La valeur ressemble à :
```
p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC... (très longue chaîne)
```

**Important** : Copiez la valeur complète depuis Resend, ne la modifiez pas.

## ⚠️ Si vous voulez utiliser le formulaire DKIM d'OVH

Si vous insistez pour utiliser le formulaire DKIM d'OVH (non recommandé car complexe) :

1. **Sous-domaine** : `resend._domainkey` ✅ (déjà pré-rempli)

2. **Clé publique (base64) *** : 
   - C'est le champ le plus important
   - Collez **TOUTE la valeur** depuis Resend (commence par `p=MIGfMAOGCSqGSIb3DQEB...`)
   - C'est une très longue chaîne de caractères

3. **Types de service** : Laissez "Aucun" ou sélectionnez "E-mail"

4. **Mode test** : Laissez "Désactivé"

5. **Sous-domaines** : Laissez par défaut

**Mais attention** : Le formulaire DKIM d'OVH peut générer une valeur différente de celle de Resend. Il vaut mieux utiliser un enregistrement TXT manuel.

## ✅ Recommandation

**Utilisez un enregistrement TXT manuel** plutôt que le formulaire DKIM d'OVH :
- Plus simple
- Plus fiable
- Correspond exactement à ce que Resend attend

## 📝 Résumé

Pour DKIM avec Resend :
1. **Annulez** le formulaire DKIM d'OVH
2. **Ajoutez un enregistrement TXT manuel** :
   - Type : **TXT**
   - Sous-domaine : `resend._domainkey`
   - Valeur : Copiez la valeur complète depuis Resend Dashboard

C'est la méthode la plus simple et la plus fiable !

