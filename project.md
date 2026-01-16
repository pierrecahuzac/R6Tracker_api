# R6Tracker - Documentation du Projet

## 📋 Vue d'ensemble

R6Tracker est une application web de suivi de performance pour le jeu **Rainbow Six Siege**. Elle permet aux joueurs de noter leurs statistiques (kills, assists, morts, etc.) entre chaque manche d'un match, afin de suivre leurs performances sur la durée.

### Contexte du jeu
- **Rainbow Six Siege** : Jeu de tir tactique où 2 équipes de 5 joueurs s'affrontent
- **Structure d'un match** :
  - Minimum 4 manches (score 4-0)
  - Maximum 9 manches (score 5-4)
  - Chaque manche se joue en attaque ou défense
  - Chaque joueur choisit un opérateur (personnage) avec des capacités spécifiques

### Objectif de l'application
Permettre à chaque joueur de :
- Créer et suivre ses matchs en temps réel
- Noter ses statistiques après chaque manche (kills, assists, morts, points, résultat)
- Consulter ses statistiques historiques
- Analyser ses performances par carte, mode de jeu, opérateur, etc.

---

## 🏗️ Architecture du Projet

Le projet est divisé en **2 applications distinctes** :

### 1. **R6Tracker_api** (Backend)
- **Localisation** : `/home/thaliios/Dev/R6Tracker_api`
- **Type** : API REST
- **Technologies** : Node.js, Express.js, Prisma ORM, PostgreSQL

### 2. **R6Tracker_web** (Frontend)
- **Localisation** : `/home/thaliios/Dev/R6Tracker_web`
- **Type** : Application web React
- **Technologies** : React 19, TypeScript, Vite, SCSS

---

## 🔧 Stack Technique

### Backend (R6Tracker_api)

#### Technologies principales
- **Node.js** (ES Modules)
- **Express.js** 4.19.2 - Framework web
- **Prisma** 6.16.2 - ORM pour PostgreSQL
- **PostgreSQL** 15 - Base de données relationnelle
- **JWT** (jsonwebtoken 9.0.2) - Authentification par tokens
- **bcryptjs** 3.0.2 - Hashage des mots de passe
- **Zod** 4.1.12 - Validation de schémas
- **cookie-parser** 1.4.7 - Gestion des cookies
- **CORS** 2.8.5 - Gestion des origines cross-origin
- **dotenv** 16.4.5 - Variables d'environnement
- **uuid** 13.0.0 - Génération d'identifiants uniques

#### Structure du backend
```
R6Tracker_api/
├── server.js              # Point d'entrée de l'application
├── routes.js              # Routeur principal
├── createRouter.js        # Factory pour créer des routeurs Express
├── prisma/
│   ├── schema.prisma      # Schéma de base de données
│   ├── seed.js            # Script de seeding
│   ├── data.json          # Données de référence (cartes, opérateurs, etc.)
│   └── migrations/        # Migrations Prisma
├── src/
│   ├── auth/              # Authentification
│   │   ├── router.js
│   │   └── controller.js
│   ├── player/            # Gestion des joueurs
│   │   ├── router.js
│   │   └── controller.js
│   ├── game/              # Gestion des matchs
│   │   ├── router.js
│   │   ├── controller.js
│   │   └── service.js
│   ├── round/             # Gestion des manches
│   │   ├── router.js
│   │   ├── controller.js
│   │   └── service.js
│   ├── operator/          # Gestion des opérateurs
│   │   ├── router.js
│   │   └── controller.js
│   ├── map/               # Gestion des cartes
│   │   ├── router.js
│   │   └── controller.js
│   ├── gameMode/          # Gestion des modes de jeu
│   │   ├── router.js
│   │   └── controller.js
│   ├── middleware/        # Middlewares Express
│   │   ├── authMiddleware.js
│   │   └── functionsMiddleware.js
│   └── functions.js       # Fonctions utilitaires
├── docker-compose.yml     # Configuration Docker
├── Dockerfile.dev         # Image Docker développement
└── Dockerfile.prod        # Image Docker production
```

### Frontend (R6Tracker_web)

#### Technologies principales
- **React** 19.1.1 - Bibliothèque UI
- **TypeScript** 5.9.3 - Typage statique
- **Vite** 7.1.7 - Build tool et dev server
- **React Router** 7.9.4 - Routing
- **Axios** 1.12.2 - Client HTTP
- **TanStack React Query** 5.90.3 - Gestion d'état serveur
- **SCSS/Sass** 1.93.2 - Préprocesseur CSS
- **AOS** 3.0.0-beta.6 - Animations on scroll
- **React Toastify** 11.0.5 - Notifications toast

#### Structure du frontend
```
R6Tracker_web/
├── src/
│   ├── main.tsx           # Point d'entrée React
│   ├── App.tsx            # Composant racine avec routes
│   ├── pages/             # Pages de l'application
│   │   ├── home.tsx
│   │   ├── signin.tsx
│   │   ├── signup.tsx
│   │   ├── gameModeChoice.tsx
│   │   ├── maps.tsx
│   │   ├── sideChoice.tsx
│   │   ├── operator.tsx
│   │   ├── round.tsx
│   │   ├── endGame.tsx
│   │   ├── stats.tsx
│   │   ├── player.tsx
│   │   ├── passwordForgot.tsx
│   │   └── changePassword.tsx
│   ├── contexts/          # Contextes React
│   │   └── gameContext.tsx # Contexte global de jeu
│   ├── components/        # Composants réutilisables
│   ├── ui/                # Composants UI
│   │   ├── statButton.tsx
│   │   └── returnButton.tsx
│   ├── functions/         # Fonctions utilitaires
│   │   ├── apiClient.ts   # Client Axios configuré
│   │   └── playerFunctions.tsx
│   ├── hooks/             # Hooks React personnalisés
│   │   ├── useToast.ts
│   │   └── useWindowsSize.ts
│   ├── type/              # Définitions TypeScript
│   │   ├── player.d.ts
│   │   ├── game.d.ts
│   │   ├── round.d.ts
│   │   ├── operator.d.ts
│   │   └── ...
│   ├── styles/            # Fichiers SCSS
│   │   ├── App.css
│   │   ├── index.css
│   │   └── *.scss
│   └── assets/            # Ressources statiques
├── public/                # Fichiers publics
├── vite.config.ts         # Configuration Vite
├── tsconfig.json          # Configuration TypeScript
├── docker-compose.yml     # Configuration Docker
└── Dockerfile             # Image Docker
```

---

## 🗄️ Base de Données

### Schéma Prisma

La base de données utilise **PostgreSQL** avec **Prisma ORM**. Voici les modèles principaux :

#### 1. **Player** (Joueur)
- `id` (UUID) - Identifiant unique
- `email` (String, unique) - Email du joueur
- `username` (String) - Nom d'utilisateur
- `password` (String, hashé) - Mot de passe hashé avec bcrypt
- `language` (String, default: "Fr") - Langue préférée
- `activeGameId` (String?, unique) - ID de la partie en cours
- `createdAt` (DateTime) - Date de création
- Relations :
  - `accounts` → PlayerAccount[] (comptes multi-plateformes)
  - `game` → Game[] (parties passées)
  - `rounds` → Round[] (manches jouées)
  - `activeGame` → Game? (partie active)
  - `Token` → Token[] (tokens de session)

#### 2. **Game** (Match/Partie)
- `id` (UUID) - Identifiant unique
- `playerId` (String?) - ID du joueur propriétaire
- `mapId` (String?) - ID de la carte jouée
- `modeId` (String?) - ID du mode de jeu
- `platformId` (String?) - ID de la plateforme
- `accountId` (String?) - ID du compte joueur utilisé
- `playerScore` (Int, default: 0) - Score du joueur
- `opponentScore` (Int, default: 0) - Score de l'adversaire
- `status` (String?) - Statut du match (IN_PROGRESS, PLAYER_WON, PLAYER_LOST, MATCH_DRAW, OVERTIME)
- `overtime` (Boolean, default: false) - Indique si le match est en prolongation
- `roundNumber` (Int, default: 0) - Numéro de la manche actuelle
- `isFinished` (Boolean, default: false) - Indique si le match est terminé
- `date` (DateTime?) - Date du match
- `createdAt` (DateTime) - Date de création
- `updatedAt` (DateTime) - Date de dernière mise à jour
- Relations :
  - `player` → Player? (joueur propriétaire)
  - `map` → Map? (carte jouée)
  - `mode` → GameMode? (mode de jeu)
  - `platform` → Platform? (plateforme)
  - `account` → PlayerAccount? (compte utilisé)
  - `rounds` → Round[] (manches du match)
  - `activePlayer` → Player? (joueur ayant cette partie active)

#### 3. **Round** (Manche)
- `id` (UUID) - Identifiant unique
- `gameId` (String) - ID du match parent
- `playerId` (String) - ID du joueur
- `roundNumber` (Int) - Numéro de la manche (unique par match)
- `sideId` (String) - ID du côté (ATTACK ou DEFENSE)
- `operatorId` (String?) - ID de l'opérateur joué
- `roundResult` (String?) - Résultat (Victory, Defeat, Draw)
- `kills` (Int, default: 0) - Nombre de kills
- `death` (Boolean, default: false) - Indique si le joueur est mort
- `assists` (Int, default: 0) - Nombre d'assists
- `disconnected` (Boolean, default: false) - Indique si déconnexion
- `points` (Int, default: 0) - Points obtenus
- `isFinished` (Boolean, default: false) - Indique si la manche est terminée
- `createdAt` (DateTime) - Date de création
- Relations :
  - `game` → Game (match parent)
  - `player` → Player (joueur)
  - `side` → Side (côté joué)
  - `operator` → Operator? (opérateur joué)
- Contrainte : `@@unique([gameId, roundNumber])` - Une seule manche par numéro par match

#### 4. **Operator** (Opérateur)
- `id` (UUID) - Identifiant unique
- `name` (String, unique) - Nom de l'opérateur
- `sideId` (String) - ID du côté (ATTACK ou DEFENSE)
- `image` (String?) - URL de l'image
- `icon` (String) - URL de l'icône
- Relations :
  - `side` → Side (côté de l'opérateur)
  - `rounds` → Round[] (manches jouées avec cet opérateur)

#### 5. **Map** (Carte)
- `id` (UUID) - Identifiant unique
- `name` (String, unique) - Nom de la carte (en anglais)
- `nameFr` (String, unique) - Nom de la carte (en français)
- `url` (String, unique) - URL de l'image de la carte
- Relations :
  - `games` → Game[] (matchs joués sur cette carte)

#### 6. **GameMode** (Mode de jeu)
- `id` (UUID) - Identifiant unique
- `name` (String, unique) - Nom du mode (ex: "Ranked", "Unranked", "Quick Match")
- Relations :
  - `games` → Game[] (matchs dans ce mode)

#### 7. **Side** (Côté)
- `id` (UUID) - Identifiant unique
- `name` (String, unique) - Nom du côté ("ATTACK" ou "DEFENSE")
- `label` (String) - Libellé du côté ("attaque" ou "défense")
- Relations :
  - `operators` → Operator[] (opérateurs de ce côté)
  - `roundsSide` → Round[] (manches jouées de ce côté)

#### 8. **Platform** (Plateforme)
- `id` (UUID) - Identifiant unique
- `name` (String, unique) - Nom de la plateforme (ex: "PC", "Xbox", "PlayStation")
- Relations :
  - `games` → Game[] (matchs sur cette plateforme)
  - `accounts` → PlayerAccount[] (comptes sur cette plateforme)

#### 9. **PlayerAccount** (Compte joueur)
- `id` (UUID) - Identifiant unique
- `playerId` (String) - ID du joueur propriétaire
- `platformId` (String) - ID de la plateforme
- `gamertag` (String) - Nom du compte sur la plateforme
- `externalId` (String?) - ID externe (optionnel)
- Relations :
  - `player` → Player (joueur propriétaire)
  - `platform` → Platform (plateforme)
  - `games` → Game[] (matchs joués avec ce compte)
- Contrainte : `@@unique([playerId, platformId])` - Un seul compte par plateforme par joueur

#### 10. **Token** (Token de session)
- `id` (UUID) - Identifiant unique
- `playerId` (String) - ID du joueur
- `tokenValue` (String, unique) - Valeur du refresh token (RID)
- `isRevoked` (Boolean, default: false) - Indique si le token est révoqué
- `expiresAt` (DateTime) - Date d'expiration
- `createdAt` (DateTime) - Date de création
- Relations :
  - `player` → Player (joueur propriétaire)

### Index et contraintes
- Index sur `Game.playerId`, `Game.mapId`, `Game.modeId`, `Game.platformId`, `Game.date`
- Index sur `Round.gameId`
- Index sur `PlayerAccount.platformId` et `gamertag`
- Contrainte unique sur `Round([gameId, roundNumber])`
- Contrainte unique sur `PlayerAccount([playerId, platformId])`

---

## 🔌 API Endpoints

### Authentification (`/api/auth`)

#### `GET /api/auth/me`
- **Description** : Vérifie le token et retourne les informations du joueur connecté
- **Authentification** : Requise (JWT)
- **Réponse** :
```json
{
  "message": "player connected",
  "isLoggedIn": true,
  "playerId": "uuid",
  "username": "string",
  "player": { ... }
}
```

### Joueurs (`/api/player`)

#### `POST /api/player/signup`
- **Description** : Crée un nouveau compte joueur
- **Body** :
```json
{
  "email": "string",
  "username": "string",
  "password": "string"
}
```
- **Réponse** : `{ "message": "player created", "player": {...} }`

#### `POST /api/player/login`
- **Description** : Connecte un joueur
- **Body** :
```json
{
  "email": "string",
  "password": "string"
}
```
- **Réponse** : Définit les cookies `access_token` et `refresh_token`
- **Cookies** :
  - `access_token` : JWT valide 15 minutes
  - `refresh_token` : JWT valide 7 jours

#### `POST /api/player/logout`
- **Description** : Déconnecte un joueur et révoque les tokens
- **Authentification** : Requise

#### `GET /api/player/findById/playerId/:playerId`
- **Description** : Récupère un joueur par son ID
- **Authentification** : Requise

### Matchs (`/api/game`)

#### `POST /api/game/create`
- **Description** : Crée un nouveau match
- **Authentification** : Requise
- **Body** :
```json
{
  "playerId": "uuid"
}
```
- **Réponse** : Crée un match et le lie au joueur via `activeGameId`

#### `PUT /api/game/update/:gameId`
- **Description** : Met à jour un match (carte, mode, numéro de manche)
- **Authentification** : Requise
- **Body** :
```json
{
  "data": {
    "gameMode": "string",
    "map": "string"
  },
  "roundNumber": 0
}
```

#### `GET /api/game/findByPlayerId`
- **Description** : Récupère tous les matchs d'un joueur
- **Authentification** : Requise
- **Réponse** : Liste des matchs avec rounds inclus

#### `GET /api/game/findGamesByPlayerId`
- **Description** : Récupère tous les matchs d'un joueur (format détaillé)
- **Authentification** : Requise

#### `GET /api/game/findAll`
- **Description** : Récupère tous les matchs non terminés
- **Authentification** : Requise

#### `GET /api/game/:gameId`
- **Description** : Récupère un match par son ID avec tous les détails
- **Authentification** : Requise
- **Réponse** :
```json
{
  "message": "Game founded",
  "gameById": {
    "id": "uuid",
    "rounds": [...],
    "map": {...},
    "mode": {...},
    ...
  }
}
```

### Manches (`/api/round`)

#### `POST /api/round/create`
- **Description** : Crée une nouvelle manche
- **Body** :
```json
{
  "sideChoosen": "ATTACK" | "DEFENSE",
  "playerId": "uuid",
  "gameId": "uuid"
}
```
- **Logique** : Calcule automatiquement le `roundNumber` (dernier + 1)

#### `PUT /api/round/update/:roundId`
- **Description** : Met à jour une manche avec les statistiques
- **Body** :
```json
{
  "round": {
    "kills": 0,
    "death": false,
    "assists": 0,
    "disconnected": false,
    "points": 0,
    "roundResult": "Victory" | "Defeat" | "Draw",
    "operatorId": "uuid"
  },
  "isFinished": true
}
```
- **Logique métier** :
  1. Met à jour les statistiques de la manche
  2. Si `roundResult` est "Victory" ou "Defeat", met à jour le score du match
  3. Calcule le score actuel avec `calculateCurrentScore()`
  4. Détermine le statut du match :
     - `PLAYER_WON` : 4-0, 4-1, 4-2, ou 5-X (avec pScore > oScore)
     - `PLAYER_LOST` : 0-4, 1-4, 2-4, ou X-5 (avec oScore > pScore)
     - `MATCH_DRAW` : 5-5 ou `forceDraw: true`
     - `OVERTIME` : 3-3
     - `IN_PROGRESS` : Sinon
  5. Met à jour le statut du match si nécessaire

#### `GET /api/round/:gameId`
- **Description** : Récupère toutes les manches d'un match
- **Réponse** : Liste des rounds avec leurs statistiques

### Opérateurs (`/api/operator`)

#### `GET /api/operator/getAll`
- **Description** : Récupère tous les opérateurs
- **Réponse** : Liste de tous les opérateurs avec leurs informations

#### `GET /api/operator/getAllOperatorsBySide/:side`
- **Description** : Récupère les opérateurs d'un côté spécifique
- **Paramètres** : `side` = "ATTACK" ou "DEFENSE"
- **Réponse** : Liste des opérateurs du côté demandé

### Cartes (`/api/map`)

#### `GET /api/map/getAll`
- **Description** : Récupère toutes les cartes
- **Réponse** : Liste de toutes les cartes avec leurs informations

### Modes de jeu (`/api/gameMode`)

#### `GET /api/gameMode/getAll`
- **Description** : Récupère tous les modes de jeu
- **Réponse** : Liste des modes de jeu disponibles

---

## 🔐 Système d'Authentification

### Mécanisme JWT avec Refresh Tokens

L'application utilise un système d'authentification basé sur **JWT (JSON Web Tokens)** avec deux types de tokens :

1. **Access Token** :
   - Durée de vie : **15 minutes**
   - Stocké dans un cookie `access_token`
   - Utilisé pour authentifier les requêtes API
   - Contient : `sub` (playerId), `username`, `email`

2. **Refresh Token** :
   - Durée de vie : **7 jours**
   - Stocké dans un cookie `refresh_token`
   - Contient un `rid` (Refresh ID) unique stocké en base de données
   - Utilisé pour régénérer un access token expiré
   - Contient : `sub`, `username`, `email`, `rid`

### Flux d'authentification

#### 1. Connexion (`POST /api/player/login`)
```
1. Vérification email/password avec bcrypt
2. Génération de l'access token (15 min)
3. Génération du refresh token (7 jours) avec un RID unique
4. Stockage du refresh token en base (table Token)
5. Envoi des deux tokens en cookies HTTP-only
```

#### 2. Requête authentifiée
```
1. Le middleware authMiddleware.decodeJWT vérifie l'access token
2. Si valide → requête autorisée
3. Si expiré → tentative de rafraîchissement avec refresh token
4. Si refresh token valide → génération d'un nouvel access token
5. Si refresh token invalide/révoqué → erreur 401
```

#### 3. Déconnexion (`POST /api/player/logout`)
```
1. Récupération du RID depuis le refresh token
2. Marquage du token comme révoqué (isRevoked = true)
3. Suppression des cookies
```

### Middleware d'authentification

Le middleware `authMiddleware.decodeJWT` :
- Vérifie la présence et la validité de l'access token
- En cas d'expiration, tente de rafraîchir avec le refresh token
- Vérifie que le refresh token n'est pas révoqué en base
- Ajoute `req.user` avec les informations du joueur
- Gère les erreurs et renvoie des messages appropriés

### Sécurité
- Cookies HTTP-only (non accessibles depuis JavaScript)
- Cookies sécurisés en production (`secure: true`)
- SameSite configuré selon l'environnement
- Mots de passe hashés avec bcrypt
- Validation des tokens avec vérification en base de données

---

## 🔄 Flux de Données Frontend ↔ Backend

### Communication

Le frontend utilise **Axios** configuré avec :
- Base URL depuis `VITE_PUBLIC_BASE_API_URL`
- `withCredentials: true` pour envoyer les cookies
- Headers `Content-Type: application/json`

### Contexte React Global

L'application utilise un **GameContext** (`gameContext.tsx`) qui maintient l'état global :
- `player` : Informations du joueur connecté
- `game` : Match actif
- `round` : Manche en cours
- `score` : Score actuel du match
- `mapChosen` : Carte sélectionnée
- `loading` : État de chargement

### Flux typique d'une partie

1. **Création du match** :
   ```
   Frontend → POST /api/game/create → Backend crée Game + met à jour Player.activeGameId
   ```

2. **Choix du mode de jeu** :
   ```
   Frontend → PUT /api/game/update/:gameId (gameMode) → Backend met à jour Game.modeId
   ```

3. **Choix de la carte** :
   ```
   Frontend → PUT /api/game/update/:gameId (map) → Backend met à jour Game.mapId
   ```

4. **Création d'une manche** :
   ```
   Frontend → POST /api/round/create (sideChoosen) → Backend crée Round avec roundNumber auto
   ```

5. **Choix de l'opérateur** :
   ```
   Frontend → Met à jour le contexte local (pas d'API immédiate)
   ```

6. **Saisie des statistiques** :
   ```
   Frontend → Met à jour le contexte local (round.kills, round.assists, etc.)
   ```

7. **Validation de la manche** :
   ```
   Frontend → PUT /api/round/update/:roundId (round + isFinished: true)
   → Backend :
     - Met à jour Round
     - Calcule le score (playerScore, opponentScore)
     - Détermine le statut du match (PLAYER_WON, PLAYER_LOST, OVERTIME, etc.)
     - Retourne gameStatus et finalScore
   ```

8. **Fin du match** :
   ```
   Si gameStatus === 'PLAYER_WON' | 'PLAYER_LOST' | 'MATCH_DRAW'
   → Frontend redirige vers /end-game
   Sinon → Frontend redirige vers /sideChoice pour la prochaine manche
   ```

### Calcul du score

La fonction `calculateCurrentScore()` dans `functions.js` :
- Récupère tous les rounds terminés (`isFinished: true`) d'un match
- Compte les résultats :
  - `Victory` → +1 pour playerScore
  - `Defeat` → +1 pour opponentScore
  - `Draw` → +1 pour les deux
- Retourne `{ playerScore, opponentScore }`

### Détermination du statut du match

Dans `RoundController.updateRoundById` :
- `PLAYER_WON` : 4-0, 4-1, 4-2, ou 5-X (avec pScore > oScore)
- `PLAYER_LOST` : 0-4, 1-4, 2-4, ou X-5 (avec oScore > pScore)
- `MATCH_DRAW` : 5-5 ou `forceDraw: true`
- `OVERTIME` : 3-3
- `IN_PROGRESS` : Sinon

---

## 📱 Pages et Navigation

### Routes Frontend (React Router)

| Route | Page | Description |
|-------|-------|-------------|
| `/` | `home.tsx` | Page d'accueil |
| `/signin` | `signin.tsx` | Connexion |
| `/signup` | `signup.tsx` | Inscription |
| `/game-mode-choice` | `gameModeChoice.tsx` | Choix du mode de jeu |
| `/maps` | `maps.tsx` | Choix de la carte |
| `/sideChoice` | `sideChoice.tsx` | Choix du côté (Attaque/Défense) |
| `/operator` | `operator.tsx` | Choix de l'opérateur |
| `/round` | `round.tsx` | Saisie des statistiques de la manche |
| `/end-game` | `endGame.tsx` | Écran de fin de match |
| `/stats/:playerId` | `stats.tsx` | Statistiques du joueur |
| `/player/:playerId` | `player.tsx` | Profil du joueur |
| `/password-forgot` | `passwordForgot.tsx` | Mot de passe oublié |
| `/change-password` | `changePassword.tsx` | Changement de mot de passe |

### Flux de navigation typique

```
1. Accueil (/)
   ↓
2. Connexion (/signin) ou Inscription (/signup)
   ↓
3. Choix du mode de jeu (/game-mode-choice)
   ↓
4. Choix de la carte (/maps)
   ↓
5. Choix du côté (/sideChoice)
   ↓
6. Choix de l'opérateur (/operator)
   ↓
7. Saisie des stats (/round)
   ↓
8a. Si match terminé → Fin du match (/end-game)
8b. Sinon → Retour au choix du côté (/sideChoice) pour la prochaine manche
```

---

## 🐳 Docker et Déploiement

### Architecture de Déploiement

Le projet utilise une architecture hybride :
- **Frontend (R6Tracker_web)** : Déployé sur **Vercel** (plateforme cloud)
- **Backend (R6Tracker_api)** : Déployé **localement** (serveur privé)

Cette configuration permet :
- Un frontend accessible publiquement via Vercel avec CDN et déploiement automatique
- Un backend hébergé localement pour un contrôle total sur les données et la sécurité

### Frontend (R6Tracker_web) - Vercel

#### Déploiement
- **Plateforme** : Vercel
- **URL de production** : `https://r6tracker.partagetacollection.eu` (ou URL Vercel)
- **Configuration** : Fichier `vercel.json` présent dans le projet
- **Build** : Automatique via Vercel lors des push sur le dépôt
- **Variables d'environnement** : Configurées dans le dashboard Vercel
  - `VITE_PUBLIC_BASE_API_URL` : Doit pointer vers l'API backend locale

#### Avantages Vercel
- Déploiement automatique depuis Git
- CDN global pour des performances optimales
- SSL/TLS automatique
- Preview deployments pour chaque PR
- Scaling automatique

### Backend (R6Tracker_api) - Déploiement Local

#### Infrastructure Locale
Le backend est déployé sur un serveur local avec Docker Compose.

#### Docker Compose
Le fichier `docker-compose.yml` définit plusieurs services :

1. **api_r6tracker_dev** (Développement)
   - Port : 5000
   - Dockerfile : `Dockerfile.dev`
   - Volumes : Montage du code source pour hot-reload
   - Réseau : `caddy_jellyfin_network`

2. **db_r6Tracker_dev** (Développement)
   - Image : `postgres:15-alpine`
   - Healthcheck : Vérifie que PostgreSQL est prêt
   - Volume : `postgres_data` pour persistance

3. **api_r6tracker_prod** (Production)
   - Dockerfile : `Dockerfile.prod`
   - Variables d'environnement : `.env.prod`
   - Port : 5000 (exposé localement)
   - Réseau : `caddy_jellyfin_network` (probablement derrière un reverse proxy)

4. **db_r6Tracker_prod** (Production)
   - Image : `postgres:15-alpine`
   - Port exposé : 5432 (ou interne uniquement)
   - Volume : `postgres_data` pour persistance

5. **adminer** (Développement uniquement)
   - Interface web pour gérer la base de données
   - Port : 9090

6. **prisma_studio** (Développement uniquement)
   - Interface web Prisma Studio
   - Port : 5555

#### Profils Docker Compose
- `development` : Services de développement
- `production` : Services de production

#### Configuration Réseau
- Le backend utilise le réseau `caddy_jellyfin_network` (réseau externe)
- Probablement derrière un reverse proxy (Caddy) pour :
  - Gestion SSL/TLS
  - Routing vers différents services
  - Exposition sécurisée de l'API

#### Points d'attention pour le déploiement local
1. **CORS** : L'API doit autoriser les requêtes depuis le domaine Vercel
   - Configuration dans `server.js` avec `allowedOrigin`
   - Actuellement configuré pour : `https://r6tracker.partagetacollection.eu`

2. **Cookies cross-origin** :
   - Les cookies doivent être configurés avec `sameSite: "none"` et `secure: true` en production
   - Nécessaire car le frontend (Vercel) et le backend (local) sont sur des domaines différents

3. **Variables d'environnement** :
   - `NODE_ENV=production` pour le backend en production
   - `DATABASE_URL` doit pointer vers la base de données de production
   - `JWT_SECRET` et `REFRESH_SECRET` doivent être sécurisés

4. **Accès réseau** :
   - Le serveur local doit être accessible depuis Internet (via reverse proxy)
   - Le port 5000 doit être exposé ou routé via le reverse proxy
   - Configuration DNS pour pointer vers le serveur local

#### Configuration Vite (Développement)
- Host : `0.0.0.0` (accessible depuis l'extérieur)
- Port : 5173
- HMR : Port client 5175
- Allowed hosts : `r6tracker.partagetacollection.eu`

### Variables d'environnement

#### Backend (R6Tracker_api)
- `DATABASE_URL` : URL de connexion PostgreSQL
- `JWT_SECRET` : Secret pour signer les access tokens
- `REFRESH_SECRET` : Secret pour signer les refresh tokens
- `NODE_ENV` : Environnement (development/production)

**Note** : Le backend est configuré pour accepter les requêtes depuis le domaine Vercel via CORS. La configuration actuelle autorise : `https://r6tracker.partagetacollection.eu`

#### Frontend (R6Tracker_web)
- `VITE_PUBLIC_BASE_API_URL` : URL de l'API backend (doit pointer vers le serveur local)
  - Exemple en production : `https://api.r6tracker.partagetacollection.eu` ou l'URL du serveur local exposée

**Configuration Vercel** :
- Les variables d'environnement sont configurées dans le dashboard Vercel
- `VITE_PUBLIC_BASE_API_URL` doit être définie pour pointer vers le backend local
- Les variables préfixées par `VITE_` sont accessibles côté client

---

## 🗂️ Données de Référence (Seed)

Le fichier `prisma/data.json` contient les données de référence :
- **Platforms** : Liste des plateformes (PC, Xbox, PlayStation, etc.)
- **Operators** : Liste des opérateurs avec leurs informations (nom, image, icon, côté)
- **Maps** : Liste des cartes avec nom, nomFr, url
- **GameModes** : Liste des modes de jeu (Ranked, Unranked, Quick Match, etc.)

Le script `prisma/seed.js` :
1. Crée les plateformes
2. Crée les côtés (ATTACK, DEFENSE)
3. Crée les opérateurs avec leur sideId
4. Crée les cartes
5. Crée les modes de jeu

---

## 🎨 Styling et UI

### Technologies CSS
- **SCSS/Sass** : Préprocesseur CSS avec variables, mixins, nesting
- **AOS (Animate On Scroll)** : Animations au scroll

### Structure des styles
- `index.css` : Styles globaux
- `App.css` : Styles de l'application principale
- Fichiers `.scss` par page/composant

### Composants UI
- `statButton.tsx` : Bouton pour les statistiques
- `returnButton.tsx` : Bouton de retour

---

## 🔧 Outils de Développement

### Backend
- **Nodemon** : Redémarrage automatique en développement
- **Prisma Studio** : Interface graphique pour la base de données
- **Adminer** : Interface web pour PostgreSQL

### Frontend
- **Vite** : Build tool ultra-rapide avec HMR
- **TypeScript** : Typage statique
- **ESLint** : Linter pour la qualité du code
- **React DevTools** : Extension navigateur pour déboguer React

---

## 📊 Fonctionnalités Principales

### 1. Gestion des Matchs
- Création d'un nouveau match
- Suivi d'un match en cours (activeGameId)
- Mise à jour des informations du match (carte, mode, score)
- Détermination automatique du statut (victoire, défaite, match nul, prolongation)

### 2. Gestion des Manches
- Création automatique avec numérotation
- Saisie des statistiques (kills, assists, morts, points)
- Choix du côté (Attaque/Défense)
- Choix de l'opérateur
- Résultat de la manche (Victoire, Défaite, Match nul)
- Calcul automatique du score global

### 3. Statistiques
- Consultation des matchs passés
- Statistiques par match (kills totaux, assists, points, etc.)
- Affichage des manches avec opérateurs et résultats
- Filtrage et analyse des performances

### 4. Authentification
- Inscription avec validation
- Connexion avec JWT
- Gestion de session avec refresh tokens
- Déconnexion avec révocation des tokens

### 5. Gestion des Données de Référence
- Opérateurs par côté
- Cartes disponibles
- Modes de jeu
- Plateformes

---

## 🚀 Démarrage du Projet

### Prérequis
- Node.js (version compatible avec ES Modules)
- Docker et Docker Compose
- PostgreSQL (ou via Docker)

### Backend

1. **Installation des dépendances** :
```bash
cd R6Tracker_api
npm install
```

2. **Configuration** :
- Créer un fichier `.env` avec :
  - `DATABASE_URL`
  - `JWT_SECRET`
  - `REFRESH_SECRET`
  - `NODE_ENV`

3. **Base de données** :
```bash
# Générer le client Prisma
npx prisma generate

# Appliquer les migrations
npx prisma migrate deploy

# Seed les données de référence
npm run prisma:seed
```

4. **Démarrage** :
```bash
# Développement avec Docker
docker-compose --profile development up

# Ou directement avec Node
npm start
```

### Frontend

1. **Installation des dépendances** :
```bash
cd R6Tracker_web
npm install
```

2. **Configuration** :
- Créer un fichier `.env` avec :
  - `VITE_PUBLIC_BASE_API_URL` (ex: `http://localhost:5000`)

3. **Démarrage** :
```bash
# Développement
npm run dev

# Build de production
npm run build

# Preview du build
npm run preview
```

---

## 📝 Notes Importantes

### Points d'attention

1. **Gestion des parties actives** :
   - Un joueur ne peut avoir qu'une seule partie active (`activeGameId`)
   - Lors de la création d'un match, l'ancien `activeGameId` est remplacé

2. **Calcul du score** :
   - Le score est recalculé à chaque fin de manche
   - Seuls les rounds avec `isFinished: true` sont comptabilisés

3. **Numérotation des manches** :
   - Le `roundNumber` est calculé automatiquement (dernier + 1)
   - Contrainte unique : `@@unique([gameId, roundNumber])`

4. **Statut du match** :
   - Le statut est déterminé automatiquement lors de la validation d'une manche
   - Possibilité de forcer un match nul avec `forceDraw: true`

5. **CORS** :
   - Configuration CORS pour autoriser uniquement les origines spécifiées
   - `credentials: true` pour permettre l'envoi des cookies
   - **Important** : En production, le frontend (Vercel) et le backend (local) sont sur des domaines différents
   - La configuration CORS dans `server.js` autorise actuellement : `https://r6tracker.partagetacollection.eu`
   - Les cookies cross-origin nécessitent `sameSite: "none"` et `secure: true` en production

6. **Cookies** :
   - HTTP-only pour la sécurité
   - Secure en production
   - SameSite configuré selon l'environnement

---

## 🔍 Structure des Réponses API

### Format standard de succès
```json
{
  "message": "string",
  "data": { ... }
}
```

### Format d'erreur
```json
{
  "message": "string",
  "error": "string (optionnel)"
}
```

### Codes HTTP
- `200` : Succès
- `201` : Créé avec succès
- `400` : Requête invalide
- `401` : Non autorisé (token invalide/expiré)
- `404` : Ressource non trouvée
- `500` : Erreur serveur

---

## 🎯 Prochaines Étapes / Améliorations Possibles

1. **Fonctionnalités** :
   - Export des statistiques (CSV, PDF)
   - Graphiques de performance
   - Comparaison avec d'autres joueurs
   - Historique détaillé par opérateur/carte
   - Système de notes/commentaires sur les matchs

2. **Technique** :
   - Tests unitaires et d'intégration
   - Documentation API (Swagger/OpenAPI)
   - Rate limiting
   - Cache Redis pour les performances
   - WebSockets pour le suivi en temps réel

3. **Sécurité** :
   - Validation plus stricte des entrées (Zod)
   - Rate limiting sur les endpoints sensibles
   - Logging et monitoring
   - Backup automatique de la base de données

---

## 📞 Contact et Support

Pour toute question ou problème, consulter :
- Le code source dans les dossiers `R6Tracker_api` et `R6Tracker_web`
- Les fichiers de configuration (docker-compose.yml, package.json)
- Les schémas Prisma pour la structure de la base de données

---

**Document généré le** : Date de génération  
**Version du projet** : 1.0.0

