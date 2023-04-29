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

  app.post("/logout", function (req, res, next) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  });
  app.get(
    "/api/v1/auth/discord/redirect",
    passport.authenticate("discord", {
      failureRedirect: "/error"
    }),async function(req, res){
      res.json({
        msg: "Good",
        status: 200
      });
    }
  );
};
