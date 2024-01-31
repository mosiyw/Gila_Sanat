/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API operations related to orders
 */

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get User's Order History
 *     description: Retrieve the order history for the authenticated user.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: List of user's orders.
 *       '401':
 *         description: Unauthorized - user is not authenticated.
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Place an Order
 *     description: Place a new order.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '201':
 *         description: Order placed successfully.
 *       '401':
 *         description: Unauthorized - user is not authenticated.
 */

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get Order Details by ID
 *     description: Retrieve details of a specific order by its unique identifier.
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Order details.
 *       '401':
 *         description: Unauthorized - user is not authenticated.
 *       '404':
 *         description: Order not found.
 */

/**
 * @swagger
 * /api/orders/{id}:
 *   put:
 *     summary: Update Order Status (Admin)
 *     description: Update the status of an order by its unique identifier (for admins).
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *             example:
 *               status: "shipped"
 *     responses:
 *       '200':
 *         description: Order status updated successfully.
 *       '401':
 *         description: Unauthorized - user is not authenticated as an admin.
 *       '404':
 *         description: Order not found.
 */
