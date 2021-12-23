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

router.get(
  `${prefix}/getAll`,
  _auth.doAuth,
  _expence.doGetExp,
  async (req, res) => {}
);

router.patch(
  `${prefix}/markComplete`,
  _auth.doAuth,
  _expence.doMarkComplete,
  async (req, res) => {}
);

router.post(
  `${prefix}/delete`,
  _auth.doAuth,
  _expence.doDelete,
  async (req, res) => {}
);
module.exports = router;
