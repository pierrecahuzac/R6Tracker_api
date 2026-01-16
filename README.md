# R6Tracker — Backend

Description
- API backend pour R6Tracker : gestion des joueurs, comptes plateformes, parties, rounds, opérateurs, maps et modes de jeu.

Stack
- Node.js (ESM) + Express
- Prisma ORM (PostgreSQL)
- JWT, bcryptjs pour auth
- Docker / docker-compose

Prérequis
- Node 18+
- Docker & Docker Compose (pour setup conteneurisé)
- Une base PostgreSQL (le projet inclut une configuration docker)

Installation & développement local
1. Copier les variables d'environnement :
   - `cp .env.example .env` et remplir `DATABASE_URL`, `JWT_SECRET`, etc.
2. Installer les dépendances :
```bash
cd api
npm install
```
3a. Lancer en local (sans Docker) :
```bash
npx prisma generate
node server.js
# ou avec nodemon
npx nodemon server.js
```
3b. Lancer avec Docker (profile development) :
```bash
npm run api:dev:up
# arrêter
npm run api:dev:down
```

Prisma & base de données
- Générer le client Prisma : `npx prisma generate`
- Migrations (dev) : `npx prisma migrate dev --name <name>`
- Seed : `node prisma/seed.js` (script configuré)
- En production via Docker : `npm run prisma:prod:migrate`

Variables d'environnement (exemples importants)
- `DATABASE_URL` — URL PostgreSQL
- `NODE_ENV` — `development` | `production`
- `JWT_SECRET` — secret pour JWT
- `PORT` — port (par défaut 5000)

Sécurité & bonnes pratiques
- Cookies: le backend utilise `credentials: true` pour CORS — en production s'assurer que les cookies sont `Secure`, `HttpOnly` et `SameSite` appropriés.
- Limiter la taille des uploads si nécessaire (actuellement limit `50mb` global).
- Ajouter helmet, rate-limiter et logging structuré pour production.

Structure du code
- `server.js` — point d'entrée
- `routes.js` — assemble les routeurs
- `src/` — dossiers par domaine : `auth`, `game`, `player`, `round`, `map`, `operator`, `gameMode` (chaque dossier contient `controller.js`, `router.js`, `service.js`)
- `prisma/` — schéma, migrations, seed

Déploiement
- Le repo contient `Dockerfile.prod`, `docker-compose.yml` et un `.env.prod` pour la production. Le frontend est prévu pour être déployé séparément (ex: Vercel).

Suggestions rapides
- Ajouter une spec OpenAPI/Swagger
- Ajouter tests d'API (auth, création de partie/round)
- Mettre en place CI (lint, test, build, migrations en staging)

Références
- Fichier de schéma: `prisma/schema.prisma`
