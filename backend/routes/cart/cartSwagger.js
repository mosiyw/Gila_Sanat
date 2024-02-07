/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Retrieve the authenticated user's cart
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: The cart was retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       500:
 *         description: An error occurred
 */

/**
 * @swagger
 * /api/cart/add:
 *   post:
 *     summary: Add a product to the authenticated user's cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *             properties:
 *               productId:
 *                 type: string
 *     responses:
 *       200:
 *         description: The product was added to the cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 cart:
 *       404:
 *         description: The product was not found
 *       500:
 *         description: An error occurred
 */
/**
 * @swagger
 * /api/cart/update:
 *   post:
 *     summary: Update the authenticated user's cart with multiple products
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - productId
 *                     - quantity
 *                   properties:
 *                     productId:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *     responses:
 *       200:
 *         description: The cart was updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 cart:
 *       404:
 *         description: A product was not found
 *       500:
 *         description: An error occurred
 */
/**
 * @swagger
 * /api/cart/remove:
 *   delete:
 *     summary: "Remove a product from the authenticated user's cart"
 *     tags: ["Cart"]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: "object"
 *             properties:
 *               productId:
 *                 type: "string"
 *                 description: "The ID of the product to remove from the cart"
 *               removeAll:
 *                 type: "boolean"
 *                 description: "Whether to remove all quantities of the product"
 *                 default: false
 *     responses:
 *       200:
 *         description: "The product was removed from the cart successfully"
 *         content:
 *           application/json:
 *             schema:
 *       404:
 *         description: "The cart or product was not found"
 *       500:
 *         description: "An error occurred"
 */
