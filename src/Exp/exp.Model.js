const mongoose = require("mongoose");
/**
 * Expense Model
 * @title       {String}
 * @balance     {Number}
 * @completed   {Boolean}
 * @due         {Date}
 * @owner       {Object ID}
 */
const expSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 20,
    },
    balance: {
      type: Number,
      required: true,
      // Validate the amount entered
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

// Export Expense Model
const Exp = mongoose.model("Exp", expSchema);
module.exports = Exp;
