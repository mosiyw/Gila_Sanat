/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API operations related to categories
 */

const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const authMiddleware = require("../middlewares/authMiddleware");
const categoryService = require("../services/categoryService");

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get All Categories
 *     description: Retrieve a list of all categories.
 *     tags: [Categories]
 *     responses:
 *       '200':
 *         description: A list of categories.
 *         content:
 *           application/json:
 *             schema:
 *       '500':
 *         description: Internal server error.
 */
router.get("/", async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Error fetching categories" });
  }
});

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Get a Category by ID
 *     description: Retrieve a category by its unique identifier.
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: The category object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       '404':
 *         description: Category not found.
 */
router.get("/:id", (req, res) => {
  categoryController.getCategoryById(req, res);
});

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create a Category (Admin)
 *     description: Create a new category.
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             example:
 *               name: "Category Name"
 *     responses:
 *       '201':
 *         description: Category created successfully.
 *       '401':
 *         description: Unauthorized - user is not an admin.
 *       '500':
 *         description: Internal server error.
 */
router.post(
  "/",
  authMiddleware.authenticate,
  authMiddleware.isAdmin,
  (req, res) => {
    categoryController.createCategory(req, res);
  }
);

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Update a Category (Admin)
 *     description: Update an existing category.
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             example:
 *               name: "Updated Category Name"
 *     responses:
 *       '200':
 *         description: Category updated successfully.
 *       '401':
 *         description: Unauthorized - user is not an admin.
 *       '404':
 *         description: Category not found.
 *       '500':
 *         description: Internal server error.
 */
router.put(
  "/:id",
  authMiddleware.authenticate,
  authMiddleware.isAdmin,
  (req, res) => {
    categoryController.updateCategory(req, res);
  }
);

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Delete a Category (Admin)
 *     description: Delete an existing category by its unique identifier.
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to delete.
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Category deleted successfully.
 *       '401':
 *         description: Unauthorized - user is not an admin.
 *       '404':
 *         description: Category not found.
 *       '500':
 *         description: Internal server error.
 */
router.delete(
  "/:id",
  authMiddleware.authenticate,
  authMiddleware.isAdmin,
  (req, res) => {
    categoryController.deleteCategory(req, res);
  }
);

module.exports = router;
