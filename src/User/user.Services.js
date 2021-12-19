const User = require("./user.Model");

exports.doSignUp = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    res.status(200).send({ data: user, err: undefined });
  } catch (err) {
    res.status(400).send({ data: undefined, err: err });
  }
};

exports.doLogin = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateToken();
    res.cookie("jwt", token, {
      httpOnly: true,
    });
    res.status(200).send({ data: user, token, err: undefined });
  } catch (err) {
    res.status(400).send({ data: undefined, err: err.message });
  }
};
