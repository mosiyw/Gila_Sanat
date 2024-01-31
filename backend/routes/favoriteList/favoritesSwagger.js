/**
 * @swagger
 * tags:
 *   name: Favorites
 *   description: API operations related to the user's favorite products
 */

/**
 * @swagger
 * /api/favorites/add:
 *   post:
 *     summary: Add a product to the user's favorites
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
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
 *                 description: The product's id.
 *     responses:
 *       '200':
 *         description: The product was successfully added to the favorites.
 *       '400':
 *         description: The product is already in favorites.
 *       '404':
 *         description: The product was not found or is not active.
 *       '500':
 *         description: There was an error.
 */

/**
 * @swagger
 * /api/favorites/remove:
 *   delete:
 *     summary: Remove a product from the user's favorites
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
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
 *                 description: The product's id.
 *     responses:
 *       '200':
 *         description: The product was successfully removed from the favorites.
 *       '404':
 *         description: The user was not found.
 *       '500':
 *         description: There was an error.
 */

/**
 * @swagger
 * /api/favorites/:
 *   get:
 *     summary: Get the user's favorite list
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: The favorite list was successfully retrieved.
 *       '404':
 *         description: The user was not found.
 *       '500':
 *         description: There was an error.
 */
