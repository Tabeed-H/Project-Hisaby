const router = require("express").Router();
const _user = require("./user.Services");

const prefix = `/api/v1/user`;
router.post(`${prefix}/signup`, _user.doSignUp, async (req, res) => {});

module.exports = router;
