const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.getCart = async (req, res) => {
  try {
    let userCart = await Cart.findById(req.user.userId).populate(
      "items.product"
    );
    if (!userCart) {
      return res.json({ message: "Cart is empty", cart: null });
    }

    let quantityUpdated = false; // Flag to track if any quantity was updated

    // Iterate over each item in the cart
    for (let item of userCart.items) {
      // If the product's balance is less than the quantity in the cart
      if (item.product.balance < item.quantity) {
        // Update the quantity in the cart to match the product's balance
        item.quantity = item.product.balance;
        quantityUpdated = true; // Set the flag to true
      }
    }

    // Save the updated cart
    await userCart.save();

    // If any quantity was updated, add a message to the response
    if (quantityUpdated) {
      res.json({
        cart: userCart,
        message:
          "Some product quantities were updated to match the product balance",
      });
    } else {
      res.json({ cart: userCart });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};
exports.addToCart = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.userId;
  const product = await Product.findOne({
    _id: productId,
    isActive: true,
  });
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  if (product.balance < 1) {
    return res.status(400).json({ error: "Product is out of stock" });
  }

  const price = product.price.discount || product.price.original;

  let userCart = await Cart.findById(userId);

  if (!userCart) {
    userCart = new Cart({ _id: userId });
  }
  const ProductInCart = userCart.items.find((item) =>
    item.product.equals(productId)
  );
  if (ProductInCart.quantity >= product.balance) {
    return res
      .status(400)
      .json({ error: "Product quantity exceeds product balance" });
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

  await product.save();
  await userCart.save();

  res.json({ message: "Product added to cart", cart: userCart });
};

exports.updateCart = async (req, res) => {
  const { productId, quantity } = req.body; // Quantity is now sent in the request
  const userId = req.user.userId;

  let userCart = await Cart.findById(userId);
  if (!userCart) {
    return res.status(404).json({ error: "Cart not found" });
  }

  const cartItem = userCart.items.find((item) =>
    item.product.equals(productId)
  );
  if (!cartItem) {
    return res.status(404).json({ error: "Product not found in cart" });
  }

  const product = await Product.findOne({
    _id: productId,
    isActive: true,
  });
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  if (product.balance < quantity) {
    return res.status(400).json({ error: "Not enough stock for product" });
  }

  const price = product.price.discount || product.price.original;

  cartItem.quantity = quantity; // Update the quantity
  cartItem.price = price; // Update the price

  product.balance -= quantity; // Decrease the product balance
  await product.save();

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
