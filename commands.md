docker compose -f docker-compose.yml -f docker-compose.dev.yml --profile development up -d --build

npx prisma migrate dev && npx prisma db seed && npx prisma generate

# Démarrer avec le profile "production"
docker compose --profile production up

# Ou en mode détaché
docker compose --profile production up -d

# Voir les logs
docker compose --profile production logs -f

