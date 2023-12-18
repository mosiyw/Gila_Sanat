const Comment = require("../models/Comment");

// Create a new comment
exports.createComment = async (req, res) => {
  try {
    const { text, product, user } = req.body;
    const comment = new Comment({ text, product, user, status: "pending" });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get comments by product ID
exports.getCommentsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const comments = await Comment.find({ product: productId });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update comment status (admin only)
exports.updateCommentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }
    const comment = await Comment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
