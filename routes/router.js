const express = require("express");
const router = express.Router();
const passport = require("passport");
const DiscordUser = require("../database/schemas/DiscordUser");

module.exports = (app) => {
  app.get(
    "/api/v1/auth/discord",
    passport.authenticate("discord"),
    (req, res) => {
      res.send(200);
    }
  );
  app.get("/api/succeso", (req, res) => {
    if(req.user){
     res.sendStatus(200);
    }else{
     res.status(401).json({message: 'NOT LOGGED IN'});
    }
  });
  app.get("/logout", function (req, res, next) {
    req.logout(function () {
      res.redirect("https://bot25c.vercel.app/");
    });
  });
  app.get(
    "/api/v1/auth/discord/redirect",
    passport.authenticate("discord", {
      failureRedirect: "/error"
    }),async function(req, res){
      res.redirect("https://bot25c.vercel.app/");
    }
  );
};
