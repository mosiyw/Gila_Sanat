const Image = require("../models/Image");
const fs = require("fs");
const path = require("path");

exports.getAllImages = async (req, res) => {
  const images = await Image.find({});
  res.json(images);
};

exports.uploadImage = async (req, res) => {
  let newImage = new Image({
    title: req.body.title,
    imageUrl: `/uploads/products/${req.file.filename}`,
  });

  newImage = await newImage.save();

  const newFilename = `${newImage.title}-${newImage._id}${path.extname(
    req.file.originalname
  )}`;

  // Create the /uploads/products/ directory if it doesn't exist
  const dir = path.join(req.file.destination, "products");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.renameSync(req.file.path, path.join(dir, newFilename));

  newImage.imageUrl = `/uploads/products/${newFilename}`;

  const savedImage = await newImage.save();

  res.json(savedImage);
};

exports.getImages = async (req, res) => {
  const images = await Image.find({
    title: { $regex: req.params.title, $options: "i" },
  });

  if (!images.length) {
    return res.status(200).json([]);
  }

  res.json(images);
};
exports.deleteImage = async (req, res) => {
  const image = await Image.findOneAndDelete({
    imageUrl: `/Images/${req.params.filename}`,
  });

  if (!image) {
    return res.status(404).json({ error: "Image not found" });
  }

  res.json({ message: "Image deleted" });
};
