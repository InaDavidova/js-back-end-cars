const { Schema, model } = require("mongoose");

const carSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String, default: "https://t4.ftcdn.net/jpg/00/89/55/15/360_F_89551596_LdHAZRwz3i4EM4J0NHNHy2hEUYDfXc0j.jpg" },
  price: { type: Number, min: 0, required: true },
});
const Car = model("Car", carSchema);

module.exports = Car;
