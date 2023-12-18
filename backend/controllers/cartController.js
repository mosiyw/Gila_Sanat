const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.getCart = async (req, res) => {
  try {
    const userCart = await Cart.findOne({ userId: req.user.userId }).populate(
      "items.product"
    );
    if (!userCart) {
      return res.json({ message: "Cart is empty", cart: null });
    }
    res.json({ cart: userCart });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.userId; // Use the authenticated user's ID

  const product = await Product.findOne({
    _id: productId,
    isActive: true,
  });
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  const price = product.price.discount || product.price.original;

  let userCart = await Cart.findOne({ userId });
  if (!userCart) {
    userCart = new Cart({ userId: userId });
  }

  const cartItem = userCart.items.find((item) =>
    item.product.equals(productId)
  );
  if (cartItem) {
    cartItem.quantity += quantity;
    cartItem.price = price;
  } else {
    userCart.items.push({ product: productId, quantity, price });
  }

  userCart.calculateTotalPrice();
  await userCart.save();

  res.json({ message: "Product added to cart", cart: userCart });
};

exports.updateCartItem = async (req, res) => {
  try {
    const productId = req.params.id;
    const { quantity } = req.body;

    const userCart = await Cart.findOne({ userId: req.user.userId });
    if (!userCart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const cartItem = userCart.items.find((item) =>
      item.product.equals(productId)
    );
    if (!cartItem) {
      return res.status(404).json({ error: "Item not found in cart" });
    }

    cartItem.quantity = quantity;
    await userCart.save();
    res.json({ message: "Cart item updated successfully", cart: userCart });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.removeCartItem = async (req, res) => {
  try {
    const productId = req.params.id;
    const userCart = await Cart.findOne({ userId: req.user.userId });

    if (!userCart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    userCart.items = userCart.items.filter(
      (item) => !item.product.equals(productId)
    );
    await userCart.save();
    res.json({
      message: "Item removed from cart successfully",
      cart: userCart,
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};
