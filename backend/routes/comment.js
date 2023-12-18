const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentContoroller");
const authMiddleware = require("../middlewares/authMiddleware");

// Route to create a new comment
router.post("/", commentController.createComment);

// Route to get comments by product ID
router.get("/product/:productId", commentController.getCommentsByProduct);

// Route to update comment status (admin only)
router.patch(
  "/:id/status",
  authMiddleware.authenticate,
  authMiddleware.isAdmin,
  async (req, res) => {
    commentController.updateCommentStatus(req, res);
  }
);

module.exports = router;
