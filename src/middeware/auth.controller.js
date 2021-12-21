const User = require("../User/user.Model");
const jwt = require("jsonwebtoken");

exports.doAuth = async function (req, res, next) {
  try {
    const token = req.header("Authorization").replace("jwt=", "");
    const decodedToken = jwt.verify(token, "sampleProject");

    const user = await User.findOne({
      _id: decodedToken,
      "tokens.token": token,
    });

    if (!user) throw new Error();

    (req.user = user), (req.token = token);
    next();
  } catch (err) {
    res.status(401).send("Authentication Failed!");
  }
};
