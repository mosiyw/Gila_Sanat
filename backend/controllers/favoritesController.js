const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Product = require("../models/Product");
const SECRET_KEY = process.env.JWT_SECRET;

exports.addProductToFavorites = async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.userId;
    const productId = req.body.productId;

    // Find the product
    const product = await Product.findById(productId);

    // Check if product exists and is active
    if (!product || !product.isActive) {
      return res.status(404).json({ error: "Product not found or not active" });
    }

    // Find the user
    const user = await User.findById(userId);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if product ID is already in favorites
    if (user.favorites.map((id) => id.toString()).includes(productId)) {
      return res.status(400).json({ error: "Product already in favorites" });
    }

    // Add the product ID to the user's favorites
    user.favorites.push(productId);
    await user.save();

    // Return the updated favorites list
    res.status(200).json(user.favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.removeProductFromFavorites = async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.userId;
    const productId = req.body.productId;

    // Find the user
    const user = await User.findById(userId);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Remove the product ID from the user's favorites
    user.favorites.pull(productId);
    await user.save();

    // Return the updated favorites list
    res.status(200).json(user.favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.getFavoriteList = async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.userId;

    const user = await User.findById(userId).populate("favorites");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user.favorites);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};
