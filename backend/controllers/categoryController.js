const Category = require("../models/Category");
const Product = require("../models/Product");

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({ categories });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json({ category });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.createCategory = async (req, res) => {
  try {
    // Check if user is an admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: "Permission denied" });
    }

    const { name, description } = req.body;
    const category = await Category.create({ name, description });

    res
      .status(201)
      .json({ message: "Category created successfully", category });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json({ message: "Category updated successfully", category });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    // Delete the category from the products that belong to it
    await Product.updateMany(
      { category: category._id },
      { $pull: { category: category._id } }
    );
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.getCategoryProducts = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate(
      "products"
    );
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json({ products: category.products });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.addProductToCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    const product = await Product.findById(req.body.productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    // Add the product to the category
    category.products.addToSet(product._id);
    await category.save();
    // Add the category to the product
    product.category.addToSet(category._id);
    await product.save();
    res.json({ message: "Product added to category successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.removeProductFromCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Remove the product from the category
    category.products.pull(product._id);
    await category.save();

    // Remove the category from the product
    product.category.pull(category._id);
    await product.save();

    res.json({ message: "Product removed from category successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};
