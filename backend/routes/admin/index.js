const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/adminController");
const authMiddleware = require("../../middlewares/authMiddleware");

router.get(
  "/dashboard",
  authMiddleware.authenticate, // Verify user authentication
  authMiddleware.isAdmin, // Check if the authenticated user is an admin
  (req, res) => {
    adminController.getDashboard(req, res);
  }
);

router.put(
  "/orders/:id",
  authMiddleware.authenticate, // Verify user authentication
  authMiddleware.isAdmin, // Check if the authenticated user is an admin
  (req, res) => {
    adminController.updateOrderStatus(req, res);
  }
);

router.get(
  "/users",
  authMiddleware.authenticate, // Verify user authentication
  authMiddleware.isAdmin, // Check if the authenticated user is an admin
  (req, res) => {
    adminController.getUsers(req, res);
  }
);

// Add more admin-related routes as needed

module.exports = router;
