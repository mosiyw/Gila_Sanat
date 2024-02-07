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

router.post("/update", authMiddleware.authenticate, (req, res) => {
  cartController.updateCart(req, res);
});

router.delete("/remove", authMiddleware.authenticate, (req, res) => {
  cartController.removeFromCart(req, res);
});

module.exports = router;
