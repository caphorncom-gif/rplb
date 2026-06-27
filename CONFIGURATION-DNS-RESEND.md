# 📋 Configuration DNS pour Resend

## ✅ Configuration de l'enregistrement MX

D'après votre capture d'écran, la configuration MX est **correcte** :

- **Sous-domaine** : Laissez vide (pour le domaine racine `rplb-electricite.fr`)
- **Type** : MX
- **Priorité** : `10` (comme indiqué dans Resend)
- **Cible** : `feedback-smtp.eu-west-1.amazonses.com` ✅

## 📋 Tous les enregistrements DNS à ajouter

Vous devez ajouter **4 types d'enregistrements** dans votre zone DNS OVH :

### 1. DKIM (Domain Verification)

**Type** : TXT  
**Sous-domaine** : `resend._domainkey`  
**Valeur** : `p=MIGfMAOGCSqGSIb3DQEB...` (la valeur complète depuis Resend)  
**TTL** : Par défaut

**Dans OVH (RECOMMANDÉ : utiliser TXT manuel) :**
- ⚠️ **Ne pas utiliser** le formulaire DKIM d'OVH (trop complexe)
- ✅ **Ajouter un enregistrement TXT manuel** :
  1. Cliquez sur "Ajouter une entrée"
  2. Sélectionnez **"TXT"** (pas DKIM)
  3. Sous-domaine : `resend._domainkey`
  4. Valeur : Copiez la valeur complète depuis Resend Dashboard (très longue, commence par `p=MIGfMAOGCSqGSIb3DQEB...`)
  5. TTL : Par défaut

### 2. MX (Enable Sending)

**Type** : MX  
**Sous-domaine** : `send`  
**Priorité** : `10`  
**Cible** : `feedback-smtp.eu-west-1.amazonses.com` ✅ (vous êtes en train de le faire)

**Dans OVH :**
- Sous-domaine : `send`
- Type : MX
- Priorité : `10`
- Cible : `feedback-smtp.eu-west-1.amazonses.com`

### 3. SPF (Enable Sending)

**Type** : TXT  
**Sous-domaine** : `send`  
**Valeur** : `v=spf1 include:amazonses.com ~all` (la valeur complète depuis Resend)  
**TTL** : Par défaut

**Dans OVH :**
- Sous-domaine : `send`
- Type : TXT
- Valeur : Copiez la valeur complète depuis Resend

### 4. DMARC (Optional mais recommandé)

**Type** : TXT  
**Sous-domaine** : `_dmarc`  
**Valeur** : `v=DMARC1; p=none;`  
**TTL** : Par défaut

**Dans OVH (formulaire spécifique DMARC) :**
- Sous-domaine : `_dmarc` ✅ (pré-rempli)
- Version : `DMARC1` ✅ (affiché)
- **Règle pour le domaine** : Sélectionnez **"Aucune action (none)"** ou **"Ne rien faire"**
- **URI de création de rapports** : Laissez **vide**
- Mode d'alignement SPF : **Relaxed** ✅
- **Valeur finale attendue** : `v=DMARC1; p=none;`

**OU** (si le formulaire est trop complexe) :
- Annulez le formulaire DMARC
- Ajoutez un enregistrement TXT manuel :
  - Type : TXT
  - Sous-domaine : `_dmarc`
  - Valeur : `v=DMARC1; p=none;`

## ✅ Ordre recommandé d'ajout

1. **DKIM** (Domain Verification) - Le plus important
2. **MX** (Enable Sending) - Vous êtes en train de le faire ✅
3. **SPF** (Enable Sending)
4. **DMARC** (Optional)

## ⏱️ Temps de propagation

Après avoir ajouté tous les enregistrements :
- **Attendez 5-15 minutes** pour la propagation DNS
- **Vérifiez dans Resend** : Le statut devrait passer à "Verified" (vérifié)
- **Testez l'envoi** : Une fois vérifié, vous pourrez envoyer à toutes les adresses

## 🔍 Vérification

Dans Resend Dashboard > Domains :
- Le domaine devrait passer à "Verified" (vérifié)
- Tous les enregistrements devraient être marqués comme valides

## 📝 Note importante

**Attention** : Si vous avez déjà des enregistrements MX pour votre domaine, ajoutez celui de Resend en plus (ne supprimez pas les existants si vous recevez déjà des emails).

## ✅ Votre configuration actuelle

D'après votre capture d'écran :
- ✅ MX correctement configuré
- ⏳ Il reste à ajouter : DKIM, SPF, et DMARC

Continuez avec les autres enregistrements et tout devrait fonctionner !

