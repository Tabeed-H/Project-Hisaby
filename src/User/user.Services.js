const User = require("./user.Model");

exports.doSignUp = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    const token = await user.generateToken();

    res.cookie("jwt", token, {
      httpOnly: true,
    });
    res.status(200).send({ user, token, err: undefined });
  } catch (err) {
    res.status(400).send({ data: undefined, err: err });
  }
};
