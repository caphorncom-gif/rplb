# 📋 Configuration DMARC dans OVH

## ⚠️ Formulaire OVH différent

OVH a un formulaire spécifique pour DMARC avec des options détaillées. Pour Resend, on a juste besoin d'une configuration simple.

## ✅ Configuration correcte pour Resend

Dans le formulaire OVH pour DMARC :

### Champs à remplir :

1. **Sous-domaine** : `_dmarc` ✅ (déjà pré-rempli)

2. **TTL** : Par défaut ✅

3. **Version** : `DMARC1` ✅ (déjà affiché)

4. **Règle pour le domaine*** : 
   - Sélectionnez **"Aucune action (none)"** ou **"Ne rien faire"**
   - C'est l'équivalent de `p=none;`

5. **Pourcentage des messages filtrés** : 
   - Laissez `100` (ou mettez `100` si c'est à `10`)
   - Pour Resend, on peut laisser la valeur par défaut

6. **URI de création de rapports globaux** : 
   - **Laissez vide** ou supprimez le contenu
   - Resend n'a pas besoin de cette valeur pour fonctionner

7. **Règle pour les sous-domaines** : 
   - Laissez "Sélectionnez..." ou "Aucune"

8. **Mode d'alignement pour SPF** : 
   - **Relaxed** ✅ (déjà sélectionné, c'est bien)

## 🎯 Valeur finale attendue

Le champ DMARC généré devrait être :
```
v=DMARC1; p=none;
```

**OU** (si OVH ajoute d'autres paramètres, c'est OK) :
```
v=DMARC1; p=none; pct=100;
```

## ⚠️ Important

**Ne pas utiliser** la valeur générée actuellement qui contient `rua=v=DMARC1; p=none;;` - c'est incorrect.

## ✅ Configuration minimale pour Resend

Si le formulaire OVH est trop complexe, vous pouvez :

1. **Annuler** le formulaire DMARC
2. **Ajouter un enregistrement TXT manuel** :
   - Type : TXT
   - Sous-domaine : `_dmarc`
   - Valeur : `v=DMARC1; p=none;`

## 📝 Résumé

Pour Resend, la configuration DMARC minimale est :
- **Sous-domaine** : `_dmarc`
- **Type** : TXT
- **Valeur** : `v=DMARC1; p=none;`

C'est tout ce dont Resend a besoin. Les autres options du formulaire OVH sont optionnelles.

## 🔍 Vérification

Après avoir ajouté l'enregistrement :
- Dans OVH, vous devriez voir : `_dmarc IN TXT "v=DMARC1; p=none;"`
- Dans Resend, l'enregistrement devrait être marqué comme valide

