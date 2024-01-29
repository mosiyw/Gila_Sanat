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
  addresses: [
    {
      state: String,
      city: String,
      address: String,
      zipcode: Number,
      transferee: {
        firstname: String,
        lastname: String,
        phone_number: String,
      },
    },
  ],
  favorites: [],
  cart: [],
  orders: [],
  tickets: [],
});

module.exports = mongoose.model("User", userSchema);
