# FROM node:22-alpine3.22

# WORKDIR /usr/src/api

# COPY package*.json ./

# COPY prisma ./prisma/

# RUN npm i ci

# RUN npm i -g nodemon

# COPY . .

# RUN npx prisma generate

# EXPOSE 3000

# CMD ["nodemon", "server.js"]
#########################
# ÉTAPE 1 : Préparation & Génération Prisma (build-stage)
#########################
FROM node:22-alpine3.22 AS builder

WORKDIR /usr/src/api

# 1. Copie des fichiers de dépendances et de configuration (incluant devDeps pour Prisma CLI)
COPY package*.json ./
COPY prisma ./prisma/

# 2. Installation de TOUTES les dépendances pour pouvoir générer Prisma
RUN npm ci

# 3. Copie du code source pour que Prisma ait accès au schema.prisma
COPY . .

# 4. Génération du client Prisma (CRUCIAL)
RUN npx prisma generate


#########################
# ÉTAPE 2 : Image de Production (production-stage)
#########################
FROM node:22-alpine3.22 AS production

WORKDIR /usr/src/api

# 1. Configuration de l'environnement
ENV NODE_ENV=production

# 2. Copie du package.json et installation UNIQUEMENT des dépendances de production
COPY package*.json ./
RUN npm install --only=production

# 3. Copie du code source complet de l'étape builder (y compris les fichiers JS interprétés)
COPY --from=builder /usr/src/api/src /usr/src/api/src
COPY --from=builder /usr/src/api/server.js /usr/src/api/server.js
COPY --from=builder /usr/src/api/routes.js /usr/src/api/routes.js
# ... copier tous les fichiers JS nécessaires

# 4. Copie du client Prisma généré
COPY --from=builder /usr/src/api/node_modules/.prisma /usr/src/api/node_modules/.prisma

EXPOSE 3000

# Commande de production finale
CMD ["node", "server.js"]