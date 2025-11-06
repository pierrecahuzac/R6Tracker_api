import { PrismaClient } from '@prisma/client'
import fs from 'fs'

const prisma = new PrismaClient()

async function backup() {
  const data = {
    users: await prisma.user.findMany(),
    parties: await prisma.partie.findMany(),
    rounds: await prisma.round.findMany(),
    // ... toutes tes tables
  }
  
  fs.writeFileSync('backup.json', JSON.stringify(data, null, 2))
  console.log('✅ Backup créé : backup.json')
}

backup()
  .finally(() => prisma.$disconnect())