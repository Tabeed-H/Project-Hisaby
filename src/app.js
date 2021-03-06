// npm modules
const express = require("express");
const path = require("path");
const hbs = require("hbs");

// connect to db
const db = require("./db/dbConnection");

// express middleware
const app = express();

// Server config
const PORT = process.env.PORT || 5500;

// json content
app.use(express.json());

// setting up public directory
const pubDict = path.join(__dirname, "/Public");
app.use(express.static(pubDict));

// setting up viewscd..
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views/layouts"));
// hbs.registerPartials(path.join(__dirname, "/views/partials"));
hbs.registerPartials(path.join(__dirname, "/views/partials"));

// routes
const userRoutes = require("./User/user.Routes");
const expRoutes = require("./Exp/exp.Routes");
// using routes
app.use(userRoutes);
app.use(expRoutes);

app.get("/", (req, res) => res.render("index"));
app.get("/signup", (req, res) => {
  res.render("signup");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

app.get("*", (req, res) => res.render("404"));
app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log(`Server Running at PORT ${PORT}`);
});
