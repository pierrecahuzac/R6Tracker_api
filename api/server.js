const dotenv = require("dotenv");
dotenv.config();
const routes = require("./routes");
const express = require("express");

const cookieParser = require("cookie-parser");

const port = 5000;

const cors = require("cors");
const app = express();

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.disable("x-powered-by");



let corsOptions;

if (process.env.NODE_ENV === "development") {

  const originsAllowed = [
    process.env.APP_URL,
    process.env.DEVELOPPEMENT_APP_URL,
    process.env.LOCALHOST_APP_URL,

  ].filter(Boolean); 

  corsOptions = {
    origin: function (origin, callback) {
      
      const normalizedOrigin = origin ? origin.replace(/\/$/, "") : null;
      
      
      if (!origin || !normalizedOrigin) return callback(null, true);


      const normalizedAllowed = originsAllowed.map(url => url.replace(/\/$/, ""));

      if (normalizedAllowed.includes(normalizedOrigin)) {
        callback(null, true);
      } else {
        console.log(`🚫 CORS bloqué pour l'origine: ${origin}`);
        callback(new Error("Non autorisé par CORS"), false);
      }
    },
    optionsSuccessStatus: 200,
    credentials: true,
  };
} else {  
  corsOptions = {   
    origin: process.env.PROD_APP_URL,
    optionsSuccessStatus: 200,
    credentials: true,
  };
}



app.use(cors(corsOptions));


app.use(routes);
app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening on ${port}`);
});
