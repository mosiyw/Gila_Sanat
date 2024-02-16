// models/Category.js
const mongoose = require("mongoose");

const secondSubcategorySchema = new mongoose.Schema({
  name: String,
  products: Array,
});

const subcategorySchema = new mongoose.Schema({
  name: String,
  products: Array,
  second_subcategories: [secondSubcategorySchema],
});

const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
  products: Array,
  subcategories: [subcategorySchema],
});

module.exports = mongoose.model("Category", categorySchema);
