const express = require("express");
const authMiddleware = require("../../middlewares/authMiddleware");
const upload = require("../../middlewares/uploadMiddleware");
const path = require("path");
const fs = require("fs");
const imageController = require("../../controllers/imageController");

const router = express.Router();

router.post(
  "/upload",
  authMiddleware.authenticate,
  authMiddleware.isAdmin,
  upload.single("image"),
  async (req, res) => {
    imageController.uploadImage(req, res);
  }
);
router.get(
  "/",
  authMiddleware.authenticate,
  authMiddleware.isAdmin,
  async (req, res) => {
    imageController.getAllImages(req, res);
  }
);
router.get(
  "/:title",
  authMiddleware.authenticate,
  authMiddleware.isAdmin,
  async (req, res) => {
    imageController.getImages(req, res);
  }
);
router.delete(
  "/image/:filename",
  authMiddleware.authenticate,
  authMiddleware.isAdmin,
  async (req, res) => {
    imageController.deleteImage(req, res);
  }
);

module.exports = router;
