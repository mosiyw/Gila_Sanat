/**
 * @swagger
 * /api/brands:
 *   get:
 *     summary: Retrieve a list of brands
 *     description: Retrieve a list of brands. Only admins can retrieve the list.
 *     responses:
 *       200:
 *         description: A list of brands.
 */

/**
 * @swagger
 * /api/brands:
 *   post:
 *     summary: Create a new brand and upload a logo
 *     description: Create a new brand and upload a logo. The logo is saved in the /uploads/brands/ directory and renamed to include the brand name and ID.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: name
 *         type: string
 *         description: The name of the brand.
 *         required: true
 *       - in: formData
 *         name: logo
 *         type: file
 *         description: The logo to upload. The file should be an image in JPG or PNG format. The file is saved in the /uploads/brands/ directory and renamed to include the brand name and ID.
 *         required: true
 *       - in: formData
 *         name: description
 *         type: string
 *         description: The description of the brand.
 *         required: true
 *     responses:
 *       200:
 *         description: A brand was created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 */
/**
 * @swagger
 * /api/brands/delete/{id}:
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
