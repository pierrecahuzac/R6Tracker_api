import { PrismaClient } from '@prisma/client'
import fs from 'fs'

const prisma = new PrismaClient()

async function restore() {
  const data = JSON.parse(fs.readFileSync('backup.json', 'utf-8'))
  
  // Ordre important : respecter les relations FK
  await prisma.user.createMany({ data: data.users })
  await prisma.partie.createMany({ data: data.parties })
  await prisma.round.createMany({ data: data.rounds })
  
  console.log('✅ Données restaurées')
}

restore()
  .finally(() => prisma.$disconnect())