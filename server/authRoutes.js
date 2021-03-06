const express = require("express");
const passport = require("passport");
const bcrypt = require("bcryptjs");

const router = express.Router();

const User = require("./models/User");

//Local

//Sign up
router.post("/signup", async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const user = await User.findOne({ email }).exec();
    if (user) {
      res.json({ err: "User already existing" });
    } else {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(password, salt);
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        password: hash,
      });
      req.login(newUser, (err) => {
        if (err) {
          res.json(err);
        } else {
          console.log("Local login succeded");
          res.json({ user: newUser });
        }
      });
    }
  } catch (err) {
    next(err);
  }
});

//Login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, msg) => {
    if (err) {
      res.json(err);
    }
    if (!user) {
      res.json(msg);
    } else {
      req.login(user, (err) => {
        if (err) {
          res.json(err);
        } else {
          console.log("Local login succeded");
          res.json({ user });
        }
      });
    }
  })(req, res, next);
});

//Login check
router.get("/loggedin", (req, res) => {
  res.json({ user: req.user });
});

//Logout
router.delete("/logout", (req, res) => {
  req.logout();
  res.json({ message: "Successful logout" });
});

//Facebook;
// router.get(
//   "/facebook",
//   passport.authenticate("facebook", {
//     scope: ["email"],
//   })
// );

// router.get(
//   "/facebook/callback",
//   passport.authenticate("facebook", { failureRedirect: "/" }),
//   (req, res) => {
//     console.log("Facebook login succeded");
//     res.redirect("/");
//   }
// );

//Google;
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    console.log("Google login succeded");
    res.redirect("/");
  }
);

module.exports = router;
