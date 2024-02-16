/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API operations related to categories
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get All Categories
 *     description: Retrieve a list of all categories.
 *     tags: [Categories]
 *     responses:
 *       '200':
 *         description: A list of categories.
 *       '500':
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Get a Category by ID
 *     description: Retrieve a category by its unique identifier.
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: The category object.
 *       '404':
 *         description: Category not found.
 */

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create a Category (Admin)
 *     description: Create a new category.
 *     tags: [Categories]
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
 *             example:
 *               name: "Category Name"
 *     responses:
 *       '201':
 *         description: Category created successfully.
 *       '401':
 *         description: Unauthorized - user is not an admin.
 *       '500':
 *         description: Internal server error.
 */
/**
 * @swagger
 * /api/categories/{id}/subcategory:
 *   post:
 *     summary: Add a Subcategory (Admin)
 *     description: Add a new subcategory to an existing category.
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to add a subcategory to.
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
 *               name: "Subcategory Name"
 *     responses:
 *       '201':
 *         description: Subcategory added successfully.
 *       '401':
 *         description: Unauthorized - user is not an admin.
 *       '404':
 *         description: Category not found.
 *       '500':
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/categories/{categoryId}/{subcategoryId}/second_subcategories:
 *   post:
 *     summary: Add a Second Subcategory (Admin)
 *     description: Add a new second subcategory to an existing subcategory within a category.
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: ID of the category to add a second subcategory to.
 *         schema:
 *           type: string
 *       - in: path
 *         name: subcategoryId
 *         required: true
 *         description: ID of the subcategory to add a second subcategory to.
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
 *               name: "Second Subcategory Name"
 *     responses:
 *       '201':
 *         description: Second subcategory added successfully.
 *       '401':
 *         description: Unauthorized - user is not an admin.
 *       '404':
 *         description: Category or subcategory not found.
 *       '500':
 *         description: Internal server error.
 */
/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Update a Category (Admin)
 *     description: Update an existing category.
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to update.
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
 *               name: "Updated Category Name"
 *     responses:
 *       '200':
 *         description: Category updated successfully.
 *       '401':
 *         description: Unauthorized - user is not an admin.
 *       '404':
 *         description: Category not found.
 *       '500':
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Delete a Category (Admin)
 *     description: Delete an existing category by its unique identifier.
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to delete.
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Category deleted successfully.
 *       '401':
 *         description: Unauthorized - user is not an admin.
 *       '404':
 *         description: Category not found.
 *       '500':
 *         description: Internal server error.
 */
