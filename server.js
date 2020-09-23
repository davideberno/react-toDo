require("dotenv").config();

const bodyParser = require("body-parser");
const path = require("path");
const express = require("express");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mongoose = require("mongoose");

require("./passportStrategies");

const app = express();

//Parsing
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

//Session
const MongoStore = require("connect-mongo")(session);

app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

//Passport
app.use(passport.initialize());
app.use(passport.session());

//Static folder
app.use(express.static(path.join(__dirname, "/client/build")));

//Database
const uri = "mongodb://localhost:27017/react-todo";

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.log(err));

//Server
app.listen(process.env.PORT || 8080, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);

//Routes

// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "/client/build/index.html"));
// });

// app.get("/", (req, res) => {
//   res.send("Home");
// });

//Auth routes
const auth = require("./authRoutes");
app.use("/auth/", auth);

//Todos routes
const todos = require("./todoRoutes");
app.use("/todos/", todos);
