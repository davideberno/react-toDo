const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("./models/User");

//Local
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { err: "Incorrect username." });
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false, { err: "Incorrect password." });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

//Facebook;
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "/api/auth/facebook/callback",
      profileFields: ["id", "displayName", "email"],
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const [firstName, lastName] = profile.displayName.split(" ");
        //const email = profile.emails[0].value;
        const user = await User.findOne({ faceBookId: profile.id });
        if (user) {
          return cb(null, user);
        } else {
          const newUser = await User.create({
            faceBookId: profile.id,
            firstName,
            lastName,
          });
          return cb(null, newUser);
        }
      } catch (err) {
        return cb(err);
      }
    }
  )
);

//Google;
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        const { givenName, familyName } = profile.name;
        //const email = profile.emails[0].value;
        const user = await User.findOne({ googleId: profile.id });
        if (user) {
          return done(null, user);
        } else {
          const newUser = await User.create({
            googleId: profile.id,
            firstName: givenName,
            lastName: familyName,
          });
          return done(null, newUser);
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);

//Serializer
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});
