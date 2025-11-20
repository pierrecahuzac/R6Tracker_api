import jwt from "jsonwebtoken";

import prisma from '../../prisma/prismaClient.js';
import dotenv from 'dotenv'
dotenv.config()
// require("dotenv").config();

import generateAndSetAccessToken from './functionsMiddleware.js'

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
        if (error.name === "TokenExpiredError") {
          needsTokenRefresh = true;
          console.warn("Access Token expiré, tentative de rafraîchissement...");
        } else if (error.name === "JsonWebTokenError") {
          return res.status(401).json({
            message: "Accès refusé : Token d'authentification invalide.",
          });
        } else {
          console.error("Erreur inattendue:", error.message);
          return next(error);
        }
      }
    } else {
      needsTokenRefresh = true;
    }


    if (needsTokenRefresh) {
      if (!refresh_token) {
        console.warn("Authentification: Aucun Refresh Token trouvé.");
        return res.status(401).json({
          message: "Accès refusé : Aucun token d'authentification valide fourni.",
        });
      }

      try {
        const decodedRefreshToken = jwt.verify(
          refresh_token,
          process.env.REFRESH_SECRET
        );
      
        
      
        if (!decodedRefreshToken.rid) {
          console.error("Refresh Token ne contient pas de 'rid'.");
          return res.status(401).json({
            message: "Accès refusé : Token de rafraîchissement malformé (pas de RID).",
          });
        }

        const refreshTokenRecord = await prisma.token.findUnique({ 
          where: {
            tokenValue: decodedRefreshToken.rid, 
          },
          select: {
            isRevoked: true 
          }
        });

       
        if (!refreshTokenRecord || refreshTokenRecord.isRevoked === true) {
          console.warn(`Refresh Token révoqué ou non trouvé (RID: ${decodedRefreshToken.rid}).`);
          
          
          res.clearCookie("access_token", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: process.env.NODE_ENV === "production" ? "none" : "lax" });
          res.clearCookie("refresh_token", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: process.env.NODE_ENV === "production" ? "none" : "lax" });

          return res.status(401).json({
            message: "Accès refusé : Votre session a été révoquée ou est invalide. Veuillez vous reconnecter.",
          });
        }
        
      
        const userId = decodedRefreshToken.sub || decodedRefreshToken.id;

        const payload = {
          sub: userId,
          username: decodedRefreshToken.username,
          email: decodedRefreshToken.email,
          rid: decodedRefreshToken.rid,
        };

        const newAccessToken = generateAndSetAccessToken(payload, res);

     
        const decoded = jwt.verify(newAccessToken, process.env.JWT_SECRET);
        req.user = decoded;

        return next(); 
      } catch (error) {
        console.error("Erreur lors de la vérification du Refresh Token:", error.message);
        return res.status(401).json({
          message: "Accès refusé : Votre session a expiré ou est invalide. Veuillez vous reconnecter.",
        });
      }
    }

    return res.status(401).json({
      message: "Accès refusé : Authentification impossible.",
    });
  },
};

export default authMiddleware;