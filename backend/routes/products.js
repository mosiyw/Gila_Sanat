/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API operations related to products
 */

const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const productService = require("../services/productService");

/**
 * @swagger
 * /top-selling:
 *   get:
 *     summary: Get top 20 selling products
 *     description: Fetch the top 20 selling products sorted by the totalSells field in descending order.
 *     responses:
 *       200:
 *         description: A list of top 20 selling products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get("/top-selling", (req, res) => {
  productController.getTopSellingProducts(req, res);
});
/**
 * @swagger
 * /listofProducts:
 *   get:
 *     summary: Get a list of products by their IDs
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: ids
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         description: The product IDs.
 *     responses:
 *       200:
 *         description: The list of products was successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: The products were not found.
 *       500:
 *         description: There was an error.
 */
router.get("/list", productController.getProductsByIds);

/**
 * @swagger
 * /products/category:
 *   post:
 *     summary: Get products by category
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryName:
 *                 type: string
 *     responses:
 *       200:
 *         description: The list of products in the category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */
router.get("/category", (req, res) => {
  productController.getProductsByCategory(req, res);
});

/**
 * @swagger
 * /products/brand:
 *   get:
 *     summary: Get products by brand
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: brandName
 *         schema:
 *           type: string
 *         required: true
 *         description: The brand name of the products
 *     responses:
 *       200:
 *         description: The list of products of the brand
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */
router.get("/brand", (req, res) => {
  productController.getProductsByBrand(req, res);
});

/**
 * @swagger
 * /api/products/admin/search:
 *   get:
 *     summary: Search for products (admin)
 *     description: Search for products by name or code (admin only).
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: Keyword
 *         schema:
 *           type: string
 *         description: The search keyword.
 *       - in: body
 *         name: filter
 *         schema:
 *           type: string
 *         description: Filter for the search results. Set to "active products" to search only active products.
 *     responses:
 *       200:
 *         description: A list of products that match the search query.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: No products found.
 */
router.get(
  "/admin/search",
  authMiddleware.authenticate,
  authMiddleware.isAdmin,
  (req, res) => {
    productController.searchProductsAdmin(req, res);
  }
);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     description: Retrieve a list of all products.
 *     tags: [Products]
 *     responses:
 *       '200':
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *       '500':
 *         description: Internal server error.
 */
router.get("/", async (req, res) => {
  productController.getActiveProducts(req, res);
});

/**
 * @swagger
 * /api/products/allproduct:
 *   get:
 *     summary: Retrieve all products
 *     description: Retrieve all products from the database, if there are any.
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of products.
 *         schema:
 *           type: array
 *           items:
 *       404:
 *         description: No products found.
 */
router.get(
  "/allproduct",
  authMiddleware.authenticate,
  authMiddleware.isAdmin,
  async (req, res) => {
    productController.getAllProducts(req, res);
  }
);

/**
 * @swagger
 * /api/products/search:
 *   get:
 *     summary: Search for products (for Clients)
 *     description: Search for products by name or code.
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: Keyword
 *         required: true
 *         description: Search query.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of products.
 *         schema:
 *           type: array
 *           items:
 *             $ref: ''
 *       404:
 *         description: No products found.
 */

router.get("/search", (req, res) => {
  productController.searchProducts(req, res);
});

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     description: Retrieve a product by its unique identifier.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: The product object.
 *         content:
 *           application/json:
 *             schema:
 *       '404':
 *         description: Product not found.
 */
router.get("/:id", (req, res) => {
  productController.getProductById(req, res);
});

/**
 * @swagger
 * /admin/{id}:
 *   get:
 *     summary: Retrieve a product by ID for admin
 *     description: Retrieve a product by its ID. Only admins can access this endpoint.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product object retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: An error occurred
 */
router.get(
  "/admin/:id",
  authMiddleware.authenticate,
  authMiddleware.isAdmin,
  productController.getProductByIdAmin
);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a product (Admin)
 *     description: Create a new product.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: object    // Change the "price" property type to "object"
 *                 properties:
 *                   original:
 *                     type: number
 *                   discount:
 *                     type: number
 *               cover:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: array     // Change the "catrgory" property to an array
 *                 items:
 *                   type: string
 *               images:
 *                 type: array     // Change the "image" property to an array
 *                 items:
 *                   type: string
 *               specifications:
 *                 type: array     // Change "Specifications" to lowercase
 *                 items:
 *                   type: string
 *             example:
 *               name: "Product Name"
 *               price:
 *                 original: 29.99
 *                 discount: 5.00
 *               cover: "Cover URL"
 *               description: "Product description"
 *               category: ["Category1", "Category2"]
 *               images: ["Image1 URL", "Image2 URL"]
 *               specifications: ["Spec1", "Spec2"]
 *     responses:
 *       '201':
 *         description: Product created successfully.
 *       '401':
 *         description: Unauthorized - user is not an admin.
 *       '500':
 *         description: Internal server error.
 */
router.post(
  "/",
  authMiddleware.authenticate,
  authMiddleware.isAdmin,
  (req, res) => {
    productController.createProduct(req, res);
  }
);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product (Admin)
 *     description: Update an existing product.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             example:
 *               name: "Updated Product Name"
 *     responses:
 *       '200':
 *         description: Product updated successfully.
 *       '401':
 *         description: Unauthorized - user is not an admin.
 *       '404':
 *         description: Product not found.
 *       '500':
 *         description: Internal server error.
 */
router.put(
  "/:id",
  authMiddleware.authenticate,
  authMiddleware.isAdmin,
  (req, res) => {
    productController.updateProduct(req, res);
  }
);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product (Admin)
 *     description: Delete an existing product by its unique identifier.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to delete.
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Product deleted successfully.
 *       '401':
 *         description: Unauthorized - user is not an admin.
 *       '404':
 *         description: Product not found.
 *       '500':
 *         description: Internal server error.
 */
router.delete(
  "/:id",
  authMiddleware.authenticate,
  authMiddleware.isAdmin,
  (req, res) => {
    productController.deleteProduct(req, res);
  }
);

/**
 * @swagger
 * /api/products/{id}/upload-image:
 *   post:
 *     summary: Upload an image for a product
 *     description: Upload an image for a product by ID (admin only).
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the product to upload the image to.
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: An admin authentication token.
 *       - in: formData
 *         name: image
 *         type: file
 *         required: true
 *         description: The image file to upload.
 *     responses:
 *       200:
 *         description: The URL of the uploaded image.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 imageUrl:
 *                   type: string
 *                   description: The URL of the uploaded image.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Product not found.
 */
router.post(
  "/:id/upload-image",
  // authMiddleware.authenticate,
  // authMiddleware.isAdmin,
  upload.single("image"),
  productController.uploadProductImage
);

module.exports = router;
