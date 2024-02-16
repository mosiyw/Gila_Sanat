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

    const { name } = req.body;
    const category = await Category.create({ name });

    res
      .status(201)
      .json({ message: "Category created successfully", category });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};
exports.addSubcategory = async (req, res) => {
  try {
    // Check if user is an admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: "Permission denied" });
    }

    const { name } = req.body;
    const { id: categoryId } = req.params; // Read the category ID from the URL parameters

    // Find the category
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Check if a subcategory with the same name already exists
    const existingSubcategory = category.subcategories.find(
      (subcategory) => subcategory.name === name
    );
    if (existingSubcategory) {
      return res
        .status(400)
        .json({ error: "A subcategory with this name already exists" });
    }

    // Create the subcategory
    const subcategory = {
      name,
      products: [],
      second_subcategories: [],
    };

    // Add the subcategory to the category's subcategories array
    category.subcategories.push(subcategory);

    // Save the category
    await category.save();

    res.status(201).json({
      message: "Subcategory added successfully",
      subcategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.addSecondSubcategory = async (req, res) => {
  try {
    // Check if user is an admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: "Permission denied" });
    }

    const { name } = req.body;
    const { categoryId, subcategoryId } = req.params; // Read the category ID and subcategory ID from the URL parameters

    // Find the category
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Find the subcategory
    const subcategory = category.subcategories.id(subcategoryId);
    if (!subcategory) {
      return res.status(404).json({ error: "Subcategory not found" });
    }

    // Check if a second subcategory with the same name already exists
    const existingSecondSubcategory = subcategory.second_subcategories.find(
      (secondSubcategory) => secondSubcategory.name === name
    );
    if (existingSecondSubcategory) {
      return res
        .status(400)
        .json({ error: "A second subcategory with this name already exists" });
    }

    // Create the second subcategory
    const secondSubcategory = {
      name,
      products: [],
    };

    // Add the second subcategory to the subcategory's second_subcategories array
    subcategory.second_subcategories.push(secondSubcategory);

    // Save the category
    await category.save();

    res.status(201).json({
      message: "Second subcategory added successfully",
      secondSubcategory,
    });
  } catch (error) {
    console.log(error);
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
