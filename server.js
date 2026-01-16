import dotenv from "dotenv";
import routes from "./routes.js";
import express from "express";
import cookieParser from "cookie-parser";
import Cors from "cors";
import swaggerUi from 'swagger-ui-express'
import fs from 'fs'
import yaml from 'js-yaml'

dotenv.config();

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 5000;

// Middleware de base
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.disable("x-powered-by");

// 1. Détection de l'environnement
const env = process.env.NODE_ENV || "development";
const isProduction = env === "production";

console.log(`Mode: ${env}`);

let allowedOrigins;

if (isProduction) {
  allowedOrigins = ["https://r6tracker.vercel.app"];
} else {
  allowedOrigins = [
    "http://localhost:5175",
    "http://127.0.0.1:5175",
    "http://192.168.1.181:5175",
    /^http:\/\/192\.168\.1\.\d{1,3}:5175$/,
  ];
}

// 3. Options CORS
const corsOptions = {
  origin: (origin, callback) => {
    // Autorise les requêtes sans origine (comme Postman ou curl)
    if (!origin) return callback(null, true);

    const isAllowed = allowedOrigins.some((allowed) => {
      if (allowed instanceof RegExp) {
        return allowed.test(origin);
      }
      return allowed === origin;
    });

    if (isAllowed) {
      callback(null, true);
    } else {
      console.error(`Blocked by CORS: ${origin}`);
      callback(new Error(`Not allowed by CORS: ${origin}`));
    }
  },
  credentials: true, // Crucial pour les cookies
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
  ],
};

// 4. Application du CORS
app.use(Cors(corsOptions));
app.options("*", Cors(corsOptions));

app.use(routes);

// Swagger UI - only expose in non-production environments
if (!isProduction) {
  try {
    const specPath = new URL('./openapi.yaml', import.meta.url);
    const specRaw = fs.readFileSync(specPath, 'utf8');
    const swaggerDocument = yaml.load(specRaw);
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    console.log('Swagger UI available at /api/docs');
  } catch (err) {
    console.warn('Unable to load openapi.yaml for Swagger UI:', err.message);
  }
}

app.listen(port, "0.0.0.0", () => {
  console.log(`Backend API listening on port ${port}`);
});
