import express, { Request, Response } from "express";
const routerLogin = express.Router();
import passport from "passport";

routerLogin.get(`/`,passport.authenticate("discord", { scope: ['identify', 'guilds'], prompt: "consent" }),
  (req: Request, res: Response) => {
    return res.redirect(`http://localhost:300/auth/discord`)
  });

export default routerLogin;