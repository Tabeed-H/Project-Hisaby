const Exp = require("../Exp/exp.Model");

exports.doAdd = async (req, res) => {
  try {
    const exp = new Exp(req.body);
    await exp.save();

    res.status(200).send(exp);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.doGetExp = async (req, res) => {
  try {
    await req.user.populate({
      path: "exp",
    });

    res.status(200).send(req.user.exp);
  } catch (err) {
    res.status(400).send(err);
  }
};
