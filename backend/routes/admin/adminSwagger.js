/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: API operations related to admin functions
 *
 * /api/admin/dashboard:
 *   get:
 *     summary: Get Dashboard Statistics (Admin)
 *     description: Retrieve statistics and data for the admin dashboard.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Admin dashboard statistics.
 *       '401':
 *         description: Unauthorized - user is not authenticated as an admin.
 *       '500':
 *         description: Internal server error.
 *
 * /api/admin/orders/{id}:
 *   put:
 *     summary: Update Order Status (Admin)
 *     description: Update the status of an order by its unique identifier (for admins).
 *     tags: [Admin]
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
 *               status: shipped
 *     responses:
 *       '200':
 *         description: Order status updated successfully.
 *       '401':
 *         description: Unauthorized - user is not authenticated as an admin.
 *       '404':
 *         description: Order not found.
 *       '500':
 *         description: Internal server error.
 */
