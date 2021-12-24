const router = require("express").Router();
const _auth = require("../middeware/auth.controller"); // Authorization middleware
const _expence = require("./exp.Services"); // Expense Services

const prefix = `/api/v1/user/expences`; // api prefix

// Route to add a new Expense
router.post(
  `${prefix}/add`,
  _auth.doAuth,
  _expence.doAdd,
  async (req, res) => {}
);

// Route to get all the Expense a Validated and Authorized User has
router.get(
  `${prefix}/getAll`,
  _auth.doAuth,
  _expence.doGetExp,
  async (req, res) => {}
);

// Route to change the 'Complete' field for Expense (false to true)
router.patch(
  `${prefix}/markComplete`,
  _auth.doAuth,
  _expence.doMarkComplete,
  async (req, res) => {}
);

// Route to delete a Expense
router.post(
  `${prefix}/delete`,
  _auth.doAuth,
  _expence.doDelete,
  async (req, res) => {}
);

// Export the Routes
module.exports = router;
