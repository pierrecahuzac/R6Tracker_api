
import prisma from '../../prisma/prismaClient.js' 

const MapController = {
  getAll: async (req, res) => {
    const maps = await prisma.map.findMany();  
      
    return res.status(200).json(maps);

  },
};

export default  MapController;
