const dotenv = require("dotenv");
dotenv.config();
const routes = require("./routes");
const express = require("express");

const cookieParser = require("cookie-parser");

const port = 5000;

const Cors = require('cors')
const app = express();


app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));


app.disable('x-powered-by');

const originsAllowed = [
  process.env.APP_URL,
  process.env.APP_URL_,
  process.env.DEVELOPPEMENT_APP_URL_,
  process.env.DEVELOPPEMENT_APP_URL,
  process.env.LOCALHOST_APP_URL,
  process.env.LOCALHOST_APP_URL_,
].filter(Boolean);




var corsOptions = {
  origin: function (origin, callback) {
    console.log(origin);    
    if (!origin) return callback(null, true);


    if (originsAllowed.includes(origin)) {

      callback(null, true);
    } else {

      callback(new Error('Non autorisé par CORS'), false);
    }
  },
  optionsSuccessStatus: 200,
  credentials: true
}
app.use(Cors(corsOptions));
app.use(routes);
app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening on ${port}`);
  ;
});

