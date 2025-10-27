const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");


const PlayerController = {
  signup: async (req, res) => {
    const { password, email, username } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const playerExists = await prisma.player.findUnique({
      where: {
        email,
      },
    });

    if (playerExists) {
      return res.status(400).json({
        message: "Utilisateur déjà existant",
      });
    }
    
    const player = await prisma.player.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json(player);
  },

  login: async (req, res) => {
    console.log('ici');
    
    try {
      const { email, password } = req.body;
      const player = await prisma.player.findUnique({
        where: {
          email,
        },
      });

      if (player) {
        const isPasswordValid = await bcrypt.compare(password, player.password);

        if (isPasswordValid) {
          delete player.password;
          return res.status(200).json({ player, isLoggedIn: true });
        }
        console.log(player);
        
        return res.status(401).json({ message: "Combinaison email / mot de passe incorrecte" });
      }
    } catch (error) {
      throw error;
    }
  },

  findById: async (req, res) => {
    const playerId = req.params.playerId;
    try {
      const player = await prisma.player.findUnique({
        where: {
          id: playerId,
        },
      });
      if(!player) {
        return res.status(404).json({ message: "Joueur non trouvé" });
      } 
  
      delete player.password;

      return res.status(200).json(player);
    } catch (error) {
      throw error;
    }
  },
};

module.exports = PlayerController;
