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
     res.send('<h1>OK</h1>');
    }else{
     res.send('<h1>NOT LOGGED IN</h1>');
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
