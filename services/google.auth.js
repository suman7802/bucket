require("dotenv").config();
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const express = require("express");
const googleRouter = express.Router();

const config = {
  clientID: process.env.client_id,
  clientSecret: process.env.client_secret,
  callbackURL: process.env.redirect_uri,
};

function verifyAuthentication(accessToken, refreshToken, profile, done) {
  userProfile = profile;
  return done(null, userProfile);
}

passport.use(new GoogleStrategy(config, verifyAuthentication));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

googleRouter.get(
  "/oauth2",
  passport.authenticate("google", {scope: ["profile", "email"]})
);

googleRouter.get(
  "/oauth2/redirect/google",
  passport.authenticate("google", {
    failureRedirect: "/error",
    successRedirect: "/success",
    session: false,
  })
);

googleRouter.get("/success", (req, res) => res.send(userProfile));
googleRouter.get("/error", (req, res) => res.send("error logging in"));

module.exports = googleRouter;
