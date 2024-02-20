const Brand = require("../models/Brand");

exports.getBrands = async (req, res) => {
  const brands = await Brand.find();
  res.json(brands);
};

exports.addBrand = async (req, res) => {
  const newBrand = new Brand({
    name: req.body.name,
    logo: req.body.logo,
    description: req.body.description,
  });

  const savedBrand = await newBrand.save();
  res.json(savedBrand);
};

exports.removeBrand = async (req, res) => {
  const removedBrand = await Brand.findByIdAndRemove(req.params.id);
  res.json(removedBrand);
};

exports.editBrand = async (req, res) => {
  const updatedBrand = await Brand.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  res.json(updatedBrand);
};
