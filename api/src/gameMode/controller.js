const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const GameModeController = {
  getAll: async (req, res) => {
 
    const gameModes = await prisma.gameMode.findMany(
      {
      select: {
        id: true,
        name: true,
      },
    }
  );

  console.log(gameModes)    
  
    return res.status(200).json(gameModes);
    
   
  },
};

module.exports = GameModeController;
