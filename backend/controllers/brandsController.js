const fs = require("fs");
const path = require("path");
const Brand = require("../models/Brand");

exports.getBrands = async (req, res) => {
  const brands = await Brand.find();
  res.json(brands);
};

exports.getTopBrands = async (req, res) => {
  const brands = await Brand.find().sort({ created_at: -1 }).limit(10);
  res.json(brands);
};

exports.addBrand = async (req, res) => {
  // Check if a brand with the same name already exists
  const existingBrand = await Brand.findOne({ name: req.body.name });
  if (existingBrand) {
    return res
      .status(400)
      .json({ message: "A brand with this name already exists." });
  }

  let newBrand = new Brand({
    name: req.body.name,
    logo: "temp", // temporary value
    description: req.body.description,
  });

  // Save the brand to generate _id
  newBrand = await newBrand.save();

  const newFilename = `${newBrand.name}-${newBrand._id}${path.extname(
    req.file.originalname
  )}`;

  // Create the /uploads/brands/ directory if it doesn't exist
  const dir = path.join(req.file.destination, "brands");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Rename the file
  fs.renameSync(req.file.path, path.join(dir, newFilename));

  // Update the logo field with the new filename
  newBrand.logo = `/uploads/brands/${newFilename}`;

  // Save the brand again with the updated logo field
  const savedBrand = await newBrand.save();

  res.json(savedBrand);
};
exports.removeBrand = async (req, res) => {
  const brand = await Brand.findById(req.params.id);

  if (brand) {
    // Delete the image file
    const imagePath = path.join(__dirname, "..", brand.logo);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    // Delete the brand document
    const removedBrand = await Brand.findByIdAndRemove(req.params.id);
    res.json(removedBrand);
  } else {
    res.status(404).json({ message: "Brand not found" });
  }
};

exports.editBrand = async (req, res) => {
  const updatedBrand = await Brand.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  res.json(updatedBrand);
};
