const User = require("./user.Model");

exports.doSignUp = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    res.status(200).send({ user, err: undefined });
  } catch (err) {
    // console.log(err);
    res.status(400).send({ data: undefined, err: err });
  }
};
