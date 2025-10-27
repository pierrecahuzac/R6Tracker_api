FROM node:22-alpine

WORKDIR /usr/src/api

COPY package*.json ./

COPY ./prisma ./prisma/

RUN npm i

RUN npm i -g nodemon

COPY . .

RUN npx prisma generate


CMD ["nodemon", "server.js"]