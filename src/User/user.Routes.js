const router = require("express").Router();
const _user = require("./user.Services");
const _auth = require("../middeware/auth.controller");

const prefix = `/api/v1/user`; // Part of URL

// Route for user signup
router.post(`${prefix}/signup`, _user.doSignUp, async (req, res) => {});

// Route for user login
router.post(`${prefix}/login`, _user.doLogin, async (req, res) => {});

// Route to get the details of a logged User
router.post(
  `${prefix}/loggeduser`,
  _auth.doAuth,
  _user.doGetUser,
  async (req, res) => {}
);

// Route to logout a user
router.post(
  `${prefix}/logout`,
  _auth.doAuth,
  _user.doLogout,
  async (req, res) => {}
);

module.exports = router;
