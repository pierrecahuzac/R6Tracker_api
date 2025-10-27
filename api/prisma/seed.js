const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const datas = require("./data.json");

const seedDB = async () => {


  // Création des plate-formes
  await prisma.platform.createMany({
    data: datas.platform,
    skipDuplicates: true,
  });
  // Création/validation des côtés avec name/label attendus par le schéma
  await prisma.side.upsert({
    where: { name: "ATTACK" },
    update: {},
    create: { name: "ATTACK", label: "attaque" },
  });
  await prisma.side.upsert({
    where: { name: "DEFENSE" },
    update: {},
    create: { name: "DEFENSE", label: "défense" },
  });

  // Récupération des IDs de side par label
  const sides = await prisma.side.findMany();
  const sideLabelToId = sides.reduce((acc, side) => {
    acc[side.label.toLowerCase()] = side.id;
    return acc;
  }, {});

  // Préparer les opérateurs avec sideId
  const operatorsWithSideId = (datas.operator || [])
    .map((op) => ({
      name: op.name,
      image: op.image,
      icon: op.icon,
      sideId: sideLabelToId[(op.team || "").toLowerCase()],
    }))
    .filter((op) => Boolean(op.sideId));

  // Création des opérateurs (avec sideId requis)
  if (operatorsWithSideId.length > 0) {
    await prisma.operator.createMany({
      data: operatorsWithSideId,
      skipDuplicates: true,
    });
  }

  // Création des cartes
  await prisma.map.createMany({
    data: datas.maps,
    skipDuplicates: true,
  });

  // création des modes de jeu
  await prisma.gameMode.createMany({
    data: datas.gameMode,
    skipDuplicates: true,
  });
};

seedDB()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
