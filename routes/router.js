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
  app.post("/api/succeso", (req, res) => {
    try {
      const { username, locale } = req.user;
      const user = ({
       status: res.status,
       username: username || 'Failed to load user name, probaly null, or next ui error get.',
       locale: locale || 'Failed to load user locale, probaly null, or next ui error get.'
      });
      res.status(200).json(user);
     } catch (err) {
      res.status(401).json({error: '401'});
     }
  });
  app.get("/api/getUser", (req, res) => {
    res.status(200).send(req.user);
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
