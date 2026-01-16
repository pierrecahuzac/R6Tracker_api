import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import passwordValidator from "password-validator";

const passwordSchema = new passwordValidator();

passwordSchema
  .is()
  .min(8)
  .is()
  .max(100)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits(2)
  .has()
  .not()
  .spaces()
  .is()
  .not()
  .oneOf([
    "000000", "111111", "123123", "123321", "1234", "12345", "123456", "1234567", "12345678", "123456789", "1234567890", "123abc", "654321", "666666", "696969", "aaaaaa", "abc123", "alberto", "alejandra", "alejandro", "amanda", "andrea", "angel", "angels", "anthony", "asdf", "asdfasdf", "ashley", "babygirl", "baseball", "basketball", "beatriz", "blahblah", "bubbles", "buster", "butterfly", "carlos", "charlie", "cheese", "chocolate", "computer", "daniel", "diablo", "dragon", "elite", "estrella", "flower", "football", "forum", "freedom", "friends", "fuckyou", "hello", "hunter", "iloveu", "iloveyou", "internet", "jennifer", "jessica", "jesus", "jordan", "joshua", "justin", "killer", "letmein", "liverpool", "lovely", "loveme", "loveyou", "master", "matrix", "merlin", "monkey", "mustang", "nicole", "nothing", "number1", "pass", "passport", "password", "password1", "playboy", "pokemon", "pretty", "princess", "purple", "pussy", "qazwsx", "qwerty", "roberto", "sebastian", "secret", "shadow", "shit", "soccer", "starwars", "sunshine", "superman", "tequiero", "test", "testing", "trustno1", "tweety", "welcome", "westside", "whatever", "windows", "writer", "zxcvbnm", "zxczxc",
  ]);

const PlayerService = {
  signup: async (password, email, username) => {
    if (!passwordSchema.validate(password)) {
      throw new Error("Password not valid");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const playerExists = await prisma.player.findUnique({
      where: { email },
    });

    console.log(playerExists);
    if (playerExists) {
      throw new Error("Utilisateur déjà existant");
    }

    const player = await prisma.player.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    return player;
  },

  login: async (email, password) => {
    if (!email || !password) {
      throw new Error("Email ou mot de passe absent");
    }

    const player = await prisma.player.findUnique({
      where: { email },
    });

    if (!player) {
      throw new Error("Combinaison email/mot de passe incorrecte");
    }

    const isPasswordValid = await bcrypt.compare(password, player.password);
    if (!isPasswordValid) {
      throw new Error("Combinaison email/mot de passe incorrecte");
    }

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

    const accessToken = jwt.sign(payloadAccessToken, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    const refreshTokenLifetimeMs = 7 * 24 * 60 * 60;
    const refreshToken = jwt.sign(payloadRefreshToken, process.env.REFRESH_SECRET, {
      expiresIn: refreshTokenLifetimeMs,
    });
    const expiryDate = new Date(Date.now() + refreshTokenLifetimeMs * 1000);
    
    const tokenInDB = await prisma.token.create({
      data: {
        playerId: player.id,
        tokenValue: payloadRefreshToken.rid,
        expiresAt: expiryDate,
      },
    });

    return {
      accessToken,
      refreshToken,
      player: {
        id: player.id,
        username: player.username,
        email: player.email,
      },
    };
  },

  findById: async (playerId) => {
    const player = await prisma.player.findUnique({
      where: { id: playerId },
    });

    if (!player) {
      throw new Error("Joueur non trouvé");
    }

    return player;
  },

  logout: async (refreshToken) => {
    const decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    const rid = decodedRefreshToken.rid;

    const revokedToken = await prisma.token.update({
      where: { tokenValue: rid },
      data: { isRevoked: true },
    });

    return revokedToken;
  },
};

export default PlayerService;
