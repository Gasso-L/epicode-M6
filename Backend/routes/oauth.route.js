const express = require("express");
const oauth = express.Router();
const passport = require("passport");
const GithubStrategy = require("passport-github2").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session");
const oauthGithubController = require("../controller/github.controller");
const oauthGoogleController = require("../controller/google.controller");

oauth.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

oauth.use(passport.initialize());
oauth.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      // qui è il posto giusto per salvare e controllare che l'utente già non sia registrato, sul db

      return done(null, profile);
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      // Qui puoi gestire il salvataggio dell'utente nel database

      return done(null, profile);
    }
  )
);

oauth.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  oauthGithubController.authGithub
);
oauth.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  oauthGithubController.manageOauthCallback
);

oauth.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

oauth.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  oauthGoogleController.authGoogle
);

module.exports = oauth;
