import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const MapService = {
  getAll: async () => {
    const maps = await prisma.map.findMany();
    return maps;
  },
};

export default MapService;
