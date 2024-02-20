const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true, // Ensure this field is unique
  },
  logo: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
});

module.exports = mongoose.model("Brand", BrandSchema);
