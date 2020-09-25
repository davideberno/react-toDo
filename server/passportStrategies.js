const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
// const FacebookStrategy = require("passport-facebook").Strategy;
// const GoogleStrategy = require("passport-google-oauth20").Strategy;

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

//Facebook
// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FACEBOOK_APP_ID,
//       clientSecret: process.env.FACEBOOK_APP_SECRET,
//       callbackURL: "http://localhost:3000/auth/facebook/callback",
//     },
//     (accessToken, refreshToken, profile, cb) => {
//       console.log("accessToken", accessToken);
//       console.log("refreshToken", refreshToken);
//       console.log("profile", profile);

//       return cb(null, profile);
//     }
//   )
// );

//Google
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:3000/auth/google/callback",
//     },
//     (accessToken, refreshToken, profile, cb) => {
//       console.log("accessToken", accessToken);
//       console.log("refreshToken", refreshToken);
//       console.log("profile", profile);

//       return cb(null, profile);
//     }
//   )
// );

//Serializer
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});
