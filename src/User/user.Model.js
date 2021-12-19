const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Exp = require("../Exp/exp.Model");
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

userSchema.virtual("exp", {
  ref: "Exp",
  localField: "_id",
  foreignField: "owner",
});

userSchema.methods.generateToken = async function () {
  const token = jwt.sign({ _id: this._id.toString() }, "sampleProject", {
    expiresIn: "1h",
  });
  this.tokens = this.tokens.concat({ token });
  await this.save();
  return token;
};

userSchema.statics.findByCredentials = async function (email, pass) {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid Email / Password!");

  const isMatch = await bcrypt.compare(pass, user.password);
  if (!isMatch) throw new Error("Invalid Email / Password!");

  return user;
};

userSchema.methods.toJSON = function () {
  const UserObject = this.toObject();
  delete UserObject.password;
  delete UserObject.tokens;

  return UserObject;
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});
userSchema.pre("remove", async function (next) {
  await Exp.deleteMany({ owner: this._id });
  next();
});
const User = mongoose.model("User", userSchema);
module.exports = User;
