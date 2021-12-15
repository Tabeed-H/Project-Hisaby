// npm modules
const express = require("express");
const path = require("path");
const hbs = require("hbs");

// connect to db
const db = require("./db/dbConnection");

// express middleware
const app = express();

// Server config
const PORT = process.env.PORT || 3000;

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

app.get("/", (req, res) => res.render("index"));
app.get("/signup", (req, res) => {
  res.render("signup");
});
app.get("*", (req, res) => res.render("404"));
app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log(`Server Running at PORT ${PORT}`);
});
