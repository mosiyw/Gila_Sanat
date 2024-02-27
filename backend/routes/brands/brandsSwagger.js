/**
 * @swagger
 * api/brands:
 *   get:
 *     summary: Retrieve a list of brands
 *     description: Retrieve a list of brands. Only admins can retrieve the list.
 *     responses:
 *       200:
 *         description: A list of brands.
 */

/**
 * @swagger
 * api/brands:
 *   post:
 *     summary: Create a new brand
 *     description: Create a new brand. Only admins can create a new brand.
 *     responses:
 *       200:
 *         description: A brand was created.
 */

/**
 * @swagger
 * api/brands/{id}:
 *   delete:
 *     summary: Delete a brand
 *     description: Delete a brand. Only admins can delete a brand.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the brand to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A brand was deleted.
 */

/**
 * @swagger
 * api/brands/{id}:
 *   put:
 *     summary: Update a brand
 *     description: Update a brand. Only admins can update a brand.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the brand to update
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A brand was updated.
 */
