# accéder à Adminer
ssh -L 8686:localhost:8686 user@ton-vps.com
```

**Puis dans ton navigateur :**
```
http://localhost:8686
```

**Credentials Adminer :**
- **Système** : PostgreSQL
- **Serveur** : `db_r6Tracker` (nom du container)
- **Utilisateur** : La valeur de `POSTGRES_USER` dans ton `.env`
- **Mot de passe** : La valeur de `POSTGRES_PASSWORD` dans ton `.env`
- **Base de données** : La valeur de `POSTGRES_DB` dans ton `.env`

## Astuce : Créer un alias SSH

Pour ne pas avoir à retaper la commande, ajoute dans `~/.ssh/config` sur ton PC :
```
Host r6-adminer
    HostName ton-vps-ip-ou-domaine
    User ton_user
    LocalForward 8686 localhost:8686