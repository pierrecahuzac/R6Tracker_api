const jwt = require("jsonwebtoken");
const jwtFunctions = require("../jwt/jwtFunctions");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
require("dotenv").config();
const authMiddleware = {
  async decodeJWT(req, res, next) {    
    const { access_token, refresh_token } = req.cookies;
    let currentAccessToken = access_token;
    let needsTokenRefresh = false;

    if (currentAccessToken) {
      try {
        const decoded = jwt.verify(currentAccessToken, process.env.JWT_SECRET);        
        req.user = decoded;
        return next();
      } catch (error) {
        console.error(
          "Erreur de vérification de l'Access Token:",
          error.message
        );
        if (error.name === "TokenExpiredError") {
          // L'Access Token est expiré, on va tenter de le rafraîchir
          needsTokenRefresh = true;
          console.warn("Access Token expiré, tentative de rafraîchissement...");
        } else if (error.name === "JsonWebTokenError") {
          // L'Access Token est invalide (signature, malformé, etc.)
          return res.status(401).json({
            message: "Accès refusé : Token d'authentification invalide.",
          });
        } else {
          // Autre erreur inattendue lors de la vérification de l'Access Token
          return next(error);
        }
      }
    } else {
      needsTokenRefresh = true;
      console.warn(
        "Aucun Access Token trouvé, tentative de rafraîchissement..."
      );
    }

    if (needsTokenRefresh) {
      console.warn("Attempting to create a new access token");
      if (!refresh_token) {
        // Pas de Refresh Token non plus, impossible de s'authentifier
        console.warn(
          "Authentification: Aucun Refresh Token trouvé pour rafraîchir."
        );
        return res.status(401).json({
          message:
            "Accès refusé : Aucun token d'authentification fourni ou valide.",
        });
      }

      try {
        const decodedRefreshToken = jwt.verify(
          refresh_token,
          process.env.REFRESH_SECRET
        );
       
        
        if (!decodedRefreshToken.rid) {
          console.error(
            "Refresh Token ne contient pas de 'rid' pour la vérification de révocation."
          );
          return res.status(401).json({
            message:
              "Accès refusé : Token de rafraîchissement malformé (pas de RID).",
          });
        }
        const refreshTokenRevoked = await prisma.refreshToken.findUnique({
          where: {
            token: decodedRefreshToken.rid,
          },
        });

        if (refreshTokenRevoked !== null) {
          console.warn(
            `Refresh Token révoqué détecté (RID: ${decodedRefreshToken.rid}).`
          );
          res.clearCookie("access_token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
          });
          res.clearCookie("refresh_token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
          });
          return res.status(401).json({
            message:
              "Accès refusé : Votre session a été révoquée. Veuillez vous reconnecter.",
          });
        }
        const payload = {
          sub: decodedRefreshToken.sub || decodedRefreshToken.id,
          username: decodedRefreshToken.username,
          email: decodedRefreshToken.email,
          rid: decodedRefreshToken.rid,
        };

        const newAccessToken = jwtFunctions.generateAndSetAccessToken(
          payload,
          res
        );

        const decoded = jwt.verify(newAccessToken, process.env.JWT_SECRET);
    
        
        req.user = decoded;
        
        
        return next();
      } catch (error) {
        console.error(
          "Erreur lors de la vérification du Refresh Token:",
          error.message
        );

        return res.status(401).json({
          message:
            "Accès refusé : Votre session a expiré ou est invalide. Veuillez vous reconnecter.",
        });
      }
    }
    return res.status(401).json({
      message: "Accès refusé : Authentification impossible.",
    });
  },
};

module.exports = authMiddleware;