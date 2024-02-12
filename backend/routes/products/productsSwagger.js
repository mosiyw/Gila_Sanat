/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API endpoints for managing products
 */
/**
 * @swagger
 * /api/products/similar/{id}:
 *   get:
 *     tags: [Products]
 *     summary: Retrieve a list of similar products
 *     description: Retrieve a list of up to 10 products that are similar to the product with the given ID. Similarity is based on matching labels. If there are less than 10 similar products, the remaining slots are filled with random products.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to find similar products for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of similar products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: An error occurred
 */

/**
 * @swagger
 * /api/products/top-selling:
 *   get:
 *     tags: [Products]
 *     summary: Get top selling products
 *     responses:
 *       200:
 *         description: A list of top selling products
 */

/**
 * @swagger
 * /api/products/list:
 *   get:
 *     tags: [Products]
 *     summary: Get products by IDs
 *     parameters:
 *       - in: query
 *         name: ids
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         description: The product IDs to retrieve
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 */

/**
 * @swagger
 * /api/products/category:
 *   get:
 *     tags: [Products]
 *     summary: Get products by category
 *     responses:
 *       200:
 *         description: A list of products by category
 */

/**
 * @swagger
 * /api/products/brand:
 *   get:
 *     tags: [Products]
 *     summary: Get products by brand
 *     responses:
 *       200:
 *         description: A list of products by brand
 */

/**
 * @swagger
 * /api/products/admin/search:
 *   get:
 *     tags: [Products]
 *     summary: Search products (admin only)
 *     responses:
 *       200:
 *         description: A list of products matching the search query
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     tags: [Products]
 *     summary: Get active products
 *     responses:
 *       200:
 *         description: A list of active products
 */

/**
 * @swagger
 * /api/products/allproduct:
 *   get:
 *     tags: [Products]
 *     summary: Get all products (admin only)
 *     responses:
 *       200:
 *         description: A list of all products
 */

/**
 * @swagger
 * /api/products/search:
 *   get:
 *     tags: [Products]
 *     summary: Search products
 *     responses:
 *       200:
 *         description: A list of products matching the search query
 */
/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     tags: [Products]
 *     summary: Get a product by ID
 *     responses:
 *       200:
 *         description: A product
 */

/**
 * @swagger
 * /api/products/admin/{id}:
 *   get:
 *     tags: [Products]
 *     summary: Get a product by ID (admin only)
 *     responses:
 *       200:
 *         description: A product
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     tags: [Products]
 *     summary: Create a new product (admin only)
 *     responses:
 *       201:
 *         description: The created product
 */

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     tags: [Products]
 *     summary: Update a product (admin only)
 *     responses:
 *       200:
 *         description: The updated product
 */

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     tags: [Products]
 *     summary: Delete a product (admin only)
 *     responses:
 *       200:
 *         description: Confirmation of product deletion
 */

/**
 * @swagger
 * /api/products/{id}/upload-image:
 *   post:
 *     tags: [Products]
 *     summary: Upload a product image
 *     responses:
 *       200:
 *         description: The URL of the uploaded image
 */
