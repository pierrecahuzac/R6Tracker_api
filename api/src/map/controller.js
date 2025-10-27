const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const MapController = {
  getAll: async (req, res) => {
    const maps = await prisma.map.findMany();  
      
    return res.status(200).json(maps);

  },
};

module.exports = MapController;
