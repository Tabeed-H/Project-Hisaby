const mongoose = require("mongoose");

const expSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 10,
    },
    balance: {
      type: Number,
      required: true,
      validate(val) {
        if (val <= 0) throw new Error(`Enter Some Amount`);
      },
    },
    completed: {
      type: Boolean,
      default: false,
    },
    due: {
      type: Date,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Exp = mongoose.model("Exp", expSchema);
module.exports = Exp;
