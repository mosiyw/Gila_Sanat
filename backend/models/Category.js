// models/Category.js
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
  products: [{}],
});

module.exports = mongoose.model("Category", categorySchema);
