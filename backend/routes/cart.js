/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: API operations related to the shopping cart
 */

const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const authMiddleware = require("../middlewares/authMiddleware");

// Apply authentication middleware to all routes in this file
router.use(authMiddleware.authenticate);

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get User's Cart
 *     description: Retrieve the contents of the user's shopping cart.
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User's shopping cart contents.
 *       '401':
 *         description: Unauthorized - user is not authenticated.
 */
router.get("/", authMiddleware.authenticate, (req, res) => {
  cartController.getCart(req, res);
});

/**
 * @swagger
 * /api/cart/add/{id}:
 *   post:
 *     summary: Add Item to Cart
 *     description: Add a product item to the user's shopping cart.
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to add to the cart.
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *                 description: The quantity of the product to add to the cart.
 *     responses:
 *       '201':
 *         description: Product added to the cart successfully.
 *       '401':
 *         description: Unauthorized - user is not authenticated.
 *       '404':
 *         description: Product not found.
 */
router.post("/add", authMiddleware.authenticate, (req, res) => {
  cartController.addToCart(req, res);
});

/**
 * @swagger
 * /api/cart/update/{id}:
 *   put:
 *     summary: Update Cart Item Quantity
 *     description: Update the quantity of a product item in the user's shopping cart.
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product in the cart to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *             example:
 *               quantity: 3
 *     responses:
 *       '200':
 *         description: Cart item quantity updated successfully.
 *       '401':
 *         description: Unauthorized - user is not authenticated.
 *       '404':
 *         description: Product not found in the cart.
 */
router.put("/update/:id", authMiddleware.authenticate, (req, res) => {
  cartController.updateCartItem(req, res);
});

/**
 * @swagger
 * /api/cart/remove/{id}:
 *   delete:
 *     summary: Remove Item from Cart
 *     description: Remove a product item from the user's shopping cart.
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product in the cart to remove.
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Product item removed from the cart successfully.
 *       '401':
 *         description: Unauthorized - user is not authenticated.
 *       '404':
 *         description: Product not found in the cart.
 */
router.delete("/remove/:id", authMiddleware.authenticate, (req, res) => {
  cartController.removeCartItem(req, res);
});

module.exports = router;
