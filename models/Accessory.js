const { Schema, model } = require("mongoose");

const accessorySchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required!"],
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
    default:
      "data:image/png;base64,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",
  },
  price: {
    type: Number,
    min: [0, "Price cannot be negative number!"],
    required: [true, "Price is required!"],
  },
});

const Accessory = model("Accessory", accessorySchema);

module.exports = Accessory;
