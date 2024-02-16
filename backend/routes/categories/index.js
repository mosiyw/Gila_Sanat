const express = require("express");
const router = express.Router();
const categoryController = require("../../controllers/categoryController");
const authMiddleware = require("../../middlewares/authMiddleware");
const categoryService = require("../../services/categoryService");

router.get("/", async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Error fetching categories" });
  }
});

router.get("/:id", (req, res) => {
  categoryController.getCategoryById(req, res);
});

router.post(
  "/",
  authMiddleware.authenticate,
  authMiddleware.isAdmin,
  (req, res) => {
    categoryController.createCategory(req, res);
  }
);

router.put(
  "/:id",
  authMiddleware.authenticate,
  authMiddleware.isAdmin,
  (req, res) => {
    categoryController.updateCategory(req, res);
  }
);

router.post(
  "/:id/subcategory",
  authMiddleware.authenticate,
  authMiddleware.isAdmin,
  (req, res) => {
    categoryController.addSubcategory(req, res);
  }
);
router.post(
  "/:categoryId/:subcategoryId/second_subcategories",
  authMiddleware.authenticate,
  authMiddleware.isAdmin,
  (req, res) => {
    categoryController.addSecondSubcategory(req, res);
  }
);

router.delete(
  "/:id",
  authMiddleware.authenticate,
  authMiddleware.isAdmin,
  (req, res) => {
    categoryController.deleteCategory(req, res);
  }
);

module.exports = router;
