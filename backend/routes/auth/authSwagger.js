/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API operations related to user authentication
 *
 * /api/auth/register:
 *   post:
 *     summary: Register a User
 *     description: Register a new user.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               username: "user123"
 *               email: "user@example.com"
 *               password: "password123"
 *     responses:
 *       '201':
 *         description: User registered successfully.
 *       '400':
 *         description: Invalid request - missing or invalid parameters.
 *       '409':
 *         description: Conflict - user already exists with the provided email.
 *       '500':
 *         description: Internal server error.
 *
 * /api/auth/login:
 *   post:
 *     summary: Login
 *     description: Login with phone number and password.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone_number:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               phone_number: "1234567890"
 *               password: "password123"
 *     responses:
 *       '200':
 *         description: Login successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *             example:
 *               message: "Login successful"
 *               token: "your_jwt_token_here"
 *       '400':
 *         description: Invalid request - missing or invalid parameters.
 *       '401':
 *         description: Unauthorized - incorrect phone number or password.
 *       '500':
 *         description: Internal server error.
 *
 * /api/auth/profile:
 *   get:
 *     summary: Get User Profile
 *     description: Retrieve the authenticated user's profile.
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User profile data.
 *         content:
 *           application/json:
 *             schema:
 *       '401':
 *         description: Unauthorized - user is not authenticated.
 *       '500':
 *         description: Internal server error.
 *
 * /api/auth/logout:
 *   get:
 *     summary: Logout the user
 *     tags: [Authentication]
 *     responses:
 *       '200':
 *         description: Logout successful
 *       '500':
 *         description: Internal server error
 */
