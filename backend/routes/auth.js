/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API operations related to user authentication
 */

const express = require("express");
const router = express.Router();

// Import controllers and middleware
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const User = require("../models/User");
/**
 * @swagger
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
 */
router.post("/register", (req, res) => {
  authController.register(req, res);
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login
 *     description: Login with email and password.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: "user@example.com"
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
 *         description: Unauthorized - incorrect email or password.
 *       '500':
 *         description: Internal server error.
 */
router.post("/login", (req, res) => {
  authController.login(req, res);
});

/**
 * @swagger
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
 */
router.get("/profile", authMiddleware.authenticate, (req, res) => {
  authController.getProfile(req, res);
});

// Add more routes as needed

module.exports = router;
