const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  title: String,
  imageUrl: String,
});

module.exports = mongoose.model("Image", ImageSchema);
