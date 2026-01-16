import PlayerService from './service.js';
import { respondSuccess, respondError } from '../utils/responseHandler.js';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const PlayerController = {
  signup: async (req, res) => {
    const { password, email, username } = req.body;
    try {
      const player = await PlayerService.signup(password, email, username);
      return respondSuccess(res, player, "Player created", 201);
    } catch (error) {
      console.log(error);
      return respondError(res, error.message, 400);
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

      return respondSuccess(res, {
        playerId: result.player.id,
        username: result.player.username,
        email: result.player.email,
      }, "Player logged");
    } catch (error) {
      console.log(error);
      return respondError(res, error.message, 401);
    }
  },

  findById: async (req, res) => {
    const playerId = req.params.playerId;
    try {
      const player = await PlayerService.findById(playerId);
      delete player.password;
      return respondSuccess(res, player, "Player found");
    } catch (error) {
      console.log(error);
      return respondError(res, error.message, 404);
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

      return respondSuccess(res, {}, "Player disconnected");
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

export default PlayerController;
