import { defineConfig } from '@prisma/client';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
    migrations: { 
      path: 'prisma/migrations',
      seed: 'prisma/seed.js',
    },
  },
});