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
    imageUrl: `/uploads/${req.file.filename}`,
  });

  newImage = await newImage.save();

  const newFilename = `${newImage.title}-${newImage._id}${path.extname(
    req.file.originalname
  )}`;

  fs.renameSync(req.file.path, path.join(req.file.destination, newFilename));

  newImage.imageUrl = `/uploads/${newFilename}`;

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
