const router = require("express").Router();
const _auth = require("../middeware/auth.controller");
const _expence = require("./exp.Services");
const prefix = `/api/v1/user/expences`;
router.post(
  `${prefix}/add`,
  _auth.doAuth,
  _expence.doAdd,
  async (req, res) => {}
);
