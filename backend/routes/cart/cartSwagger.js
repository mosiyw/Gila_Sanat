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
 *                   $ref: '#/components/schemas/Cart'
 *       404:
 *         description: The product was not found
 *       500:
 *         description: An error occurred
 */
/**
 * @swagger
 * /api/cart/remove:
 *   delete:
 *     summary: Remove a product from the authenticated user's cart
 *     tags: [Cart]
 *     parameters:
 *       - in: body
 *         name: product
 *         description: The product to remove from the cart
 *         schema:
 *           type: object
 *           required:
 *             - productId
 *             - removeAll
 *           properties:
 *             productId:
 *               type: string
 *             removeAll:
 *               type: boolean
 *     responses:
 *       200:
 *         description: The product was removed from the cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       404:
 *         description: The cart or product was not found
 *       500:
 *         description: An error occurred
 */
