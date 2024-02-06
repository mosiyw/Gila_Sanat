const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.getCart = async (req, res) => {
  try {
    const userCart = await Cart.findById(req.user.userId).populate(
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
  const { productId } = req.body;
  const userId = req.user.userId;
  console.log(productId);
  const product = await Product.findOne({
    _id: productId,
    isActive: true,
  });
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  const price = product.price.discount || product.price.original;

  let userCart = await Cart.findById(userId);
  if (!userCart) {
    userCart = new Cart({ _id: userId });
  }

  const cartItem = userCart.items.find((item) =>
    item.product.equals(productId)
  );
  if (cartItem) {
    cartItem.quantity += 1;
    cartItem.price = price;
  } else {
    userCart.items.push({ product: productId, quantity: 1, price });
  }

  await userCart.save();

  res.json({ message: "Product added to cart", cart: userCart });
};

exports.updateCart = async (req, res) => {
  const { items } = req.body; // items should be an array of { productId, quantity }
  const userId = req.user.userId;

  let userCart = await Cart.findById(userId);
  if (!userCart) {
    userCart = new Cart({ _id: userId });
  }

  for (const item of items) {
    const product = await Product.findOne({
      _id: item.productId,
      isActive: true,
    });
    if (!product) {
      return res
        .status(404)
        .json({ error: `Product not found: ${item.productId}` });
    }

    const price = product.price.discount || product.price.original;

    const cartItem = userCart.items.find((cartItem) =>
      cartItem.product.equals(item.productId)
    );
    if (cartItem) {
      cartItem.quantity += item.quantity;
      cartItem.price = price;
    } else {
      userCart.items.push({
        product: item.productId,
        quantity: item.quantity,
        price,
      });
    }
  }

  await userCart.save();

  res.json({ message: "Cart updated", cart: userCart });
};

exports.removeFromCart = async (req, res) => {
  const { productId, removeAll } = req.body;
  const userId = req.user.userId;

  let userCart = await Cart.findById(userId);
  if (!userCart) {
    return res.status(404).json({ error: "Cart not found" });
  }

  const cartItemIndex = userCart.items.findIndex((item) =>
    item.product.equals(productId)
  );
  if (cartItemIndex === -1) {
    return res.status(404).json({ error: "Product not found in cart" });
  }

  if (removeAll || userCart.items[cartItemIndex].quantity === 1) {
    userCart.items.splice(cartItemIndex, 1);
  } else {
    userCart.items[cartItemIndex].quantity -= 1;
  }

  await userCart.save();

  res.json({ message: "Product removed from cart", cart: userCart });
};
