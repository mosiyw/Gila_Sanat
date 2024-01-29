// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  firstname: String,
  lastname: String,
  phone_number: String,
  password: String,
  isAdmin: { type: Boolean, default: false },
  addresses: [],
  favorites: [],
  cart: [],
  orders: [],
  tickets: [],
});

module.exports = mongoose.model("User", userSchema);
