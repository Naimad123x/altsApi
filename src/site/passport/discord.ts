import { Strategy } from "passport-discord";
import passport from "passport";
import * as process from "process";
import {UserRepository} from "../../utils/userRepository";

const User = new UserRepository();

const scopes = ['identify', 'guilds'];

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(
  new Strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    scope: scopes,
    prompt: "consent"
  },
  async function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
  )
);