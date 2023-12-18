//./controllers\productController.js
const Product = require("../models/Product");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

exports.getActiveProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

// exports.getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ error: "An error occurred" });
//   }
// };

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ isActive: -1, _id: -1 })
      .limit(20);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.getTopSellingProducts = async (req, res) => {
  try {
    const products = await Product.find({ totalSell: { $gt: 0 } })
      .sort({ totalSell: -1 })
      .limit(15);
    console.log(products);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.searchProducts = async (req, res) => {
  try {
    const query = req.query.Keyword;
    const products = await Product.find({
      $and: [
        { isActive: true },
        {
          $or: [
            { name: { $regex: query, $options: "i" } },
            { code: { $regex: query, $options: "i" } },
          ],
        },
      ],
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.searchProductsAdmin = async (req, res) => {
  try {
    const query = req.query.Keyword;
    let products;

    const baseQuery = {
      $or: [
        { name: { $regex: query, $options: "i" } },
        { code: { $regex: query, $options: "i" } },
      ],
    };

    if (req.body.filter === "active products") {
      products = await Product.find({
        $and: [baseQuery],
      })
        .sort({ isActive: -1, _id: -1 })
        .limit(24);
    } else {
      products = await Product.find(baseQuery)
        .sort({ isActive: -1, _id: -1 })
        .limit(24);
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      isActive: true,
    });
    if (!product) {
      return res.status(404).json({ error: "Product not found or not active" });
    }
    res.json({ product });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.getProductByIdAmin = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ product });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.createProduct = async (req, res) => {
  try {
    // Check if user is an admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: "Permission denied" });
    }

    const {
      name,
      price,
      description,
      image,
      code,
      balance,
      isActive,
      category,
      brand,
      createdAt,
    } = req.body;
    const product = await Product.create({
      name,
      price,
      description,
      image,
      category,
      brand,
      code,
      balance,
      totalSell: 0,
      isActive,
      createdAt,
    });
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    // Check if user is an admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: "Permission denied" });
    }

    const updates = req.body;
    if (updates.balance !== undefined && updates.balance < 0) {
      updates.balance = 0;
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    // Check if user is an admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: "Permission denied" });
    }

    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.uploadProductImage = async (req, res) => {
  console.log(req.body.id);
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    const extension = path.extname(file.originalname);
    const filename = uuidv4() + extension;
    const filepath = path.join(__dirname, "../public/images", filename);

    fs.writeFileSync(filepath, file.buffer);

    product.imageUrl = `/images/${filename}`;
    await product.save();

    res.json({ imageUrl: product.imageUrl });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

// Get products by category
exports.getProductsByCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;
    const products = await Product.find({ category: { $in: [categoryName] } });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get products by brand
exports.getProductsByBrand = async (req, res) => {
  try {
    const { brandName } = req.body;
    const products = await Product.find({ brand: brandName });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
