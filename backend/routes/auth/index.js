const express = require("express");
const router = express.Router();

// Import controllers and middleware
const authController = require("../../controllers/authController");
const authMiddleware = require("../../middlewares/authMiddleware");
const User = require("../../models/User");

router.post("/register", (req, res) => {
  authController.register(req, res);
});

router.post("/login", (req, res) => {
  authController.login(req, res);
});

router.get("/profile", authMiddleware.authenticate, (req, res) => {
  authController.getProfile(req, res);
});

router.put("/profile", authMiddleware.authenticate, (req, res) => {
  authController.updateProfile(req, res);
});

router.get("/logout", (req, res) => {
  req.session = null;
  res.json({ message: "Logout successful" });
});

// Add more routes as needed

module.exports = router;
