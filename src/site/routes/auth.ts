import express from "express";
const routerAuth = express.Router();
import passport from "passport";

routerAuth.get(`/discord`, passport.authenticate('discord'));
routerAuth.get('/discord/callback', passport.authenticate('discord', { failureRedirect: '/' }),
  (_req, res) => {
    res.redirect("/");
  }
);

export default routerAuth;

