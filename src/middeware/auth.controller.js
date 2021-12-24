const User = require("../User/user.Model");
const jwt = require("jsonwebtoken");

/**
 * Function : doAuth
 * Authorizes a User
 * @param {Header} req.Header Contains the jwt Token
 * @param {*} res
 * @param {*} next    Calls the next middleware
 * Success
 * @return  {JSON}  req.user  Sets User Object
 * @return  {JSON}  req.token Sets jwt Token
 * Error
 * @return  {HTTP-Status} 401-Unauthorized
 */
exports.doAuth = async function (req, res, next) {
  try {
    const token = req.header("Authorization").replace("jwt=", ""); // Manuplates the incoming Header value
    const decodedToken = jwt.verify(token, "sampleProject"); // verify the token and derive the payload

    // Find user
    const user = await User.findOne({
      _id: decodedToken,
      "tokens.token": token,
    });

    // if User not found
    if (!user) throw new Error();

    // Sending Data
    (req.user = user), (req.token = token);
    next();
  } catch (err) {
    res.status(401).send("Authentication Failed!");
  }
};
