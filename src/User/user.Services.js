const User = require("./user.Model");

/**
 * Function : doSignUP
 * Add a new user to the DB
 * @param {*} req
 * @param {*} res
 * Success
 * @return {*} data: user Data
 * @return {*} err : undefined
 * Error
 * @return {*} data : undefined
 * @return {*} err : err
 */
exports.doSignUp = async (req, res) => {
  try {
    const user = new User(req.body); // creates a new user based on the JSON object in req.body
    await user.save(); // saves on DB

    res.status(200).send({ data: user, err: undefined });
  } catch (err) {
    res.status(400).send({ data: undefined, err: err });
  }
};

/**
 * Function : doLogin
 * To login a user
 * @param {*} req
 * @param {*} res
 * Success
 * @return {*} data : user object
 * @return {*} err : undefined
 * Error
 * @return {*} data : undefined
 * @return {*} err : err
 */
exports.doLogin = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    ); // finds a user based on the given email and password

    const token = await user.generateToken(); // generated a jwt token
    res.cookie("jwt", token); // stores the token as a cookie
    res.status(200).send({ data: user, token, err: undefined });
  } catch (err) {
    res.status(400).send({ data: undefined, err: err.message });
  }
};

/**
 * Function : doLogout
 * Logouts a user and deletes the jwt token
 * @param {*} req
 * @param {*} res
 * Success
 * @return {*} message
 * Error
 * @return {*} err
 */
exports.doLogout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token != req.token
    );
    await req.user.save();
    res.status(200).send("Success!");
  } catch (err) {
    res.status(400).send(err);
  }
};

/**
 * Function : doGetUser
 * @param {*} req
 * @param {*} res
 * Success
 * @return {*} req.user from the authentication middleware
 * Error
 * @return {*} err
 */
exports.doGetUser = async (req, res) => {
  try {
    res.status(200).send({ user: req.user });
  } catch (err) {
    res.status(400).send(err);
  }
};
