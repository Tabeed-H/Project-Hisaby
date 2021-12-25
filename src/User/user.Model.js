const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Exp = require("../Exp/exp.Model");

/**
 * User Model
 * @name      {String}
 * @email     {String}
 * @password  {String}
 * @tokens    {JWT}
 */
const userSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    // validation for email
    validate(val) {
      if (!validator.isEmail(val)) throw new Error("Not a Valid Email ID");
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// Foreign field expenses related to the user
userSchema.virtual("exp", {
  ref: "Exp",
  localField: "_id",
  foreignField: "owner",
});

/**
 * Function : generateToken
 * Attached to the instance of the User Model
 * Generated a jwt token with ID of the User as Payload
 * @returns {JWT}
 */
userSchema.methods.generateToken = async function () {
  const token = jwt.sign({ _id: this._id.toString() }, "sampleProject", {
    expiresIn: "1h",
  });
  this.tokens = this.tokens.concat({ token });
  await this.save();
  return token;
};

/**
 * Function : findByCredentials
 * Attached to User Model
 * Find a user by user email and password from the requrest body
 * @param {String} email
 * @param {String} pass
 * @returns {Object} user
 */
userSchema.statics.findByCredentials = async function (email, pass) {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid Email / Password!");

  const isMatch = await bcrypt.compare(pass, user.password);
  if (!isMatch) throw new Error("Invalid Email / Password!");

  return user;
};

/**
 * Before saving the user hashes the user password
 */
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

/**
 * Deletes all the expenses owned by the user when user is deleted
 */
userSchema.pre("remove", async function (next) {
  await Exp.deleteMany({ owner: this._id });
  next();
});

/**
 * Removes(NOT DELETES) some properties of the user object not making them public
 * @returns {Object} user
 */
userSchema.methods.toJSON = function () {
  const UserObject = this.toObject();
  delete UserObject.password; // removes password
  delete UserObject.tokens; //removes tokens from the object

  return UserObject;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
