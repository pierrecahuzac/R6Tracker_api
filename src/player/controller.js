import PlayerService from './service.js';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const PlayerController = {
  signup: async (req, res) => {
    const { password, email, username } = req.body;
    try {
      const player = await PlayerService.signup(password, email, username);
      return res.status(201).json({ message: "player created", player });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const result = await PlayerService.login(email, password);
      
      const isProduction = process.env.NODE_ENV === "production";
      const cookieOptions = {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "Lax",
        path: "/",
      };

      console.log("🔐 Création des cookies:");
      console.log("- Access token créé:", !!result.accessToken, "Durée:", "15m");
      console.log("- Refresh token créé:", !!result.refreshToken, "Durée:", "7 jours");
      console.log("- Environnement:", isProduction ? "PRODUCTION" : "DEVELOPPEMENT");
      console.log("- Cookie options:", JSON.stringify(cookieOptions, null, 2));

      res.cookie("access_token", result.accessToken, {
        ...cookieOptions,
        maxAge: 15 * 60 * 1000,
      });

      res.cookie("refresh_token", result.refreshToken, {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      console.log("✅ Cookies définis dans la réponse");
      console.log("📋 En-têtes Set-Cookie:", res.getHeaders()["set-cookie"]);

      const setCookieHeaders = res.getHeaders()["set-cookie"] || [];
      const hasRefreshToken = setCookieHeaders.some((header) => header.includes("refresh_token"));
      const hasAccessToken = setCookieHeaders.some((header) => header.includes("access_token"));
      console.log("🔍 Vérification cookies:");
      console.log("- refresh_token présent:", hasRefreshToken);
      console.log("- access_token présent:", hasAccessToken);

      return res.status(200).json({
        success: true,
        message: "player logged",
        playerId: result.player.id,
        username: result.player.username,
        email: result.player.email,
      });
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: error.message });
    }
  },

  findById: async (req, res) => {
    const playerId = req.params.playerId;
    try {
      const player = await PlayerService.findById(playerId);
      delete player.password;
      return res.status(200).json(player);
    } catch (error) {
      console.log(error);
      return res.status(404).json({ message: error.message });
    }
  },

  logout: async (req, res) => {
    console.log(req.cookies);
    try {
      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax",
      };

      const result = await PlayerService.logout(req.cookies.refresh_token);
      console.log(result);

      res.clearCookie("refresh_token", cookieOptions);
      res.clearCookie("access_token", cookieOptions);

      return res.status(200).json({
        message: "player disconnected",
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

export default PlayerController;
