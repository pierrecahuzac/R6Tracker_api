const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

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
    console.log(player);
    
    return res.status(201).json({message: "player created", player});
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(401).json({
          message: "Email ou mot de passe absent",
        });
      }
      const player = await prisma.player.findUnique({
        where: {
          email,
        },
      });

      if (player) {
        const isPasswordValid = await bcrypt.compare(password, player.password);
        if (!isPasswordValid) {
          return res.status(401).json({
            message: "Combinaison email/mot de passe incorrecte",
          });
        }
        delete player.password;

        const payloadAccessToken = {
          sub: player.id,
          username: player.username,
          email: player.email,
        };

        const payloadRefreshToken = {
          sub: player.id,
          username: player.username,
          email: player.email,
          rid: uuidv4(),
        };

        const accessToken = jwt.sign(
          payloadAccessToken,
          process.env.JWT_SECRET,
          {
            expiresIn: 15 * 60 * 1000,
          }
        );
        const refreshTokenLifetimeMs = 7 * 24 * 60 * 60;
        const refreshToken = jwt.sign(
          payloadRefreshToken,
          process.env.REFRESH_SECRET,
          {
            expiresIn: refreshTokenLifetimeMs,
          }
        );
        const expiryDate = new Date(Date.now() + refreshTokenLifetimeMs * 1000);
        // je crée le token en db
        const tokenInDB = await prisma.token.create({
          data: {
            playerId: player.id,
            tokenValue: payloadRefreshToken.rid,
            expiresAt: expiryDate,
          },
        });
        
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          secure: process.env.NODE_ENV === "production",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax",
          maxAge: 15 * 60 * 1000,
        });
        return res.status(200).json({
          success: "player logged",
          playerId: player.id,
          username: player.username,
          email: player.email,
        });
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
      if (!player) {
        return res.status(404).json({ message: "Joueur non trouvé" });
      }

      delete player.password;

      return res.status(200).json(player);
    } catch (error) {
      throw error;
    }
  },
  logout: async (req, res) => {
    try {
      const playerId = req.user.sub
      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax",
      };
      const decodedRefreshToken = jwt.verify(
        req.cookies.refreshToken,
        process.env.REFRESH_SECRET
      );

      const rid = decodedRefreshToken.rid;

      const revokedToken = await prisma.token.update({
        where: {
          tokenValue: rid,
        },
        data: {
          isRevoked: true,
        },
      });
      console.log(revokedToken);

      res.clearCookie("refreshToken", cookieOptions);
      res.clearCookie("accessToken", cookieOptions);

      return res.status(200).json({
        message: "player disconnected",
      });
    } catch (error) {
      throw error;
    }
  },
};

module.exports = PlayerController;
