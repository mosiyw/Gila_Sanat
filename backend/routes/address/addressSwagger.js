// swagger.js
/**
 * @swagger
 * /api/address:
 *   post:
 *     summary: Add a new address
 *     tags: [Addresses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *     responses:
 *       '200':
 *         description: The address was added successfully.
 *       '404':
 *         description: The user was not found.
 *       '500':
 *         description: There was an error.
 *
 *   get:
 *     summary: Get all address
 *     tags: [Addresses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of address.
 *       '404':
 *         description: The user was not found.
 *       '500':
 *         description: There was an error.
 *
 * /api/address/{index}:
 *   delete:
 *     summary: Remove an address
 *     tags: [Addresses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: index
 *         schema:
 *           type: integer
 *         required: true
 *         description: The index of the address to remove.
 *     responses:
 *       '200':
 *         description: The address was removed successfully.
 *       '404':
 *         description: The user was not found.
 *       '500':
 *         description: There was an error.
 *
 *   put:
 *     summary: Edit an address
 *     tags: [Addresses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: index
 *         schema:
 *           type: integer
 *         required: true
 *         description: The index of the address to edit.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *     responses:
 *       '200':
 *         description: The address was updated successfully.
 *       '404':
 *         description: The user was not found.
 *       '500':
 *         description: There was an error.
 */
