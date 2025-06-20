const express = require("express");
const oauth = express.Router();
const passport = require("passport");
const GithubStrategy = require("passport-github2").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session");
const oauthGithubController = require("../controller/github.controller");
const oauthGoogleController = require("../controller/google.controller");
const authorsService = require("../services/authors");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

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
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email =
          profile.emails?.[0]?.value || `${profile.id}@google.local`;
        const avatar = profile.photos?.[0]?.value;

        // Verifica se autore esiste già
        let existingAuthor = await authorsService.findOne({ email });

        if (!existingAuthor) {
          const generatedPassword = crypto.randomBytes(12).toString("base64");

          const hashedPassword = await bcrypt.hash(generatedPassword, 10);

          const newAuthorData = {
            firstName: profile.name.givenName || profile.displayName,
            lastName: profile.name.familyName || "",
            email,
            avatar,
            password: hashedPassword,
          };

          existingAuthor = await authorsService.createAuthor(newAuthorData);
        }

        return done(null, existingAuthor);
      } catch (err) {
        return done(err, null);
      }
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
