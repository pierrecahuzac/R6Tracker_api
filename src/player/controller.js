import prisma from "../../prisma/prismaClient.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import passwordValidator from "password-validator";


const  passwordSchema = new passwordValidator();

passwordSchema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(100) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(2) // Must have at least 2 digits
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(["000000",
  "111111",
  "123123",
  "123321",
  "1234",
  "12345",
  "123456",
  "1234567",
  "12345678",
  "123456789",
  "1234567890",
  "123abc",
  "654321",
  "666666",
  "696969",
  "aaaaaa",
  "abc123",
  "alberto",
  "alejandra",
  "alejandro",
  "amanda",
  "andrea",
  "angel",
  "angels",
  "anthony",
  "asdf",
  "asdfasdf",
  "ashley",
  "babygirl",
  "baseball",
  "basketball",
  "beatriz",
  "blahblah",
  "bubbles",
  "buster",
  "butterfly",
  "carlos",
  "charlie",
  "cheese",
  "chocolate",
  "computer",
  "daniel",
  "diablo",
  "dragon",
  "elite",
  "estrella",
  "flower",
  "football",
  "forum",
  "freedom",
  "friends",
  "fuckyou",
  "hello",
  "hunter",
  "iloveu",
  "iloveyou",
  "internet",
  "jennifer",
  "jessica",
  "jesus",
  "jordan",
  "joshua",
  "justin",
  "killer",
  "letmein",
  "liverpool",
  "lovely",
  "loveme",
  "loveyou",
  "master",
  "matrix",
  "merlin",
  "monkey",
  "mustang",
  "nicole",
  "nothing",
  "number1",
  "pass",
  "passport",
  "password",
  "password1",
  "playboy",
  "pokemon",
  "pretty",
  "princess",
  "purple",
  "pussy",
  "qazwsx",
  "qwerty",
  "roberto",
  "sebastian",
  "secret",
  "shadow",
  "shit",
  "soccer",
  "starwars",
  "sunshine",
  "superman",
  "tequiero",
  "test",
  "testing",
  "trustno1",
  "tweety",
  "welcome",
  "westside",
  "whatever",
  "windows",
  "writer",
  "zxcvbnm",
  "zxczxc"]);

const PlayerController = {
  signup: async (req, res) => {
    const { password, email, username } = req.body;

    console.log(passwordSchema.validate(password));
    if (!passwordSchema.validate(password)) {
      return res.status(401).json({
        message: "Password not valid",
      });
    }
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
    return res.status(201).json({ message: "player created", player });
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

        res.cookie("refresh_token", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          secure: process.env.NODE_ENV === "production",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.cookie("access_token", accessToken, {
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

export default PlayerController;
