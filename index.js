const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const path = require("path");
const fs = require("fs");
const http = require("http");
const https = require("https");

const compression = require("compression");
const enforce = require("express-sslify");
const passport = require("passport");
const session = require('express-session');
const mongoose = require("mongoose");
const MongoStore = require('connect-mongo');
require("dotenv").config();

const privateKey  = fs.readFileSync('certificates/key.pem', 'utf8');
const certificate = fs.readFileSync('certificates/cert.pem', 'utf8');
const credentials = {key: privateKey, cert: certificate};
const app = express();
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

const PORT = 443;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(session({
  secret : process.env.SECRET_KEY,
  cookie: {
    maxAge: 60000 * 60 * 24
  },
  saveUninitialized: false,
  resave: false,
  name: "discord.oauth2",
  store: MongoStore.create({mongoUrl: process.env.MONGOOSE})
}));
app.use(passport.initialize());
app.use(passport.session());

require("./routes/router")(app);
require('./strategies/discord');

app.use(compression());
app.use(enforce.HTTPS({ trustProtoHeader: true }));
app.use(express.static(path.join(__dirname, "client/build")));
// For http
httpServer.listen(8080);
// For https
httpsServer.listen(8443);

mongoose.connect(process.env.MONGOOSE).then(() => console.log('Connected!'));

app.get("/", (req, res) => {
  res.send(`<h1>if you reading this, welcome to the main bot25c api!</h1>`);
});

app.get("/error", (err, req, res) => {
  if(err){
    res.json({
      msg: "Bad",
      status: 200,
    });
  }else{
    res.json({
      msg: "Good",
      status: 200,
    });
  }
});

app.get("*", (req, res) => {
  res.send(`<h1>Something goes wrong!</h1>`);
});
