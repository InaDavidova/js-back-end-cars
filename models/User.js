const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: { type: String, required: true, minlength: 3 },
  password: { type: String, required: true, minlength: 3 },
});

const User = model("User", userSchema);

module.exports = User;