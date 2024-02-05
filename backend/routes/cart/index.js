const express = require("express");
const router = express.Router();
const cartController = require("../../controllers/cartController");
const authMiddleware = require("../../middlewares/authMiddleware");

// Apply authentication middleware to all routes in this file
router.use(authMiddleware.authenticate);

router.get("/", authMiddleware.authenticate, (req, res) => {
  cartController.getCart(req, res);
});

router.post("/add", authMiddleware.authenticate, (req, res) => {
  cartController.addToCart(req, res);
});

router.put("/update/:id", authMiddleware.authenticate, (req, res) => {
  cartController.updateCartItem(req, res);
});

router.delete("/remove/:id", authMiddleware.authenticate, (req, res) => {
  cartController.removeCartItem(req, res);
});

module.exports = router;