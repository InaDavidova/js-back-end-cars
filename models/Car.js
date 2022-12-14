const { Schema,  model, Types: { ObjectId } } = require("mongoose");

const carSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required!"],
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
    validate:[/^https?:\/\//i, "Invalid image url!"],
    default: "https://t4.ftcdn.net/jpg/00/89/55/15/360_F_89551596_LdHAZRwz3i4EM4J0NHNHy2hEUYDfXc0j.jpg",
  },
  price: {
    type: Number,
    required: [true, "Price is required!"],
    min: [0, "Price cannot be a negative number!"],
  },
  accessories: [
    {
      type: ObjectId,
      ref: "Accessory",
    },
  ],
  owner: {
    type: ObjectId,
    ref: "User",
  },
});
const Car = model("Car", carSchema);

module.exports = Car;
