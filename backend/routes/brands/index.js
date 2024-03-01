const express = require("express");
const router = express.Router();
const brandsController = require("../../controllers/brandsController");
const authMiddleware = require("../../middlewares/authMiddleware");
const upload = require("../../middlewares/uploadMiddleware");

router.get(
  "/",
  authMiddleware.authenticate,
  authMiddleware.isAdmin,
  brandsController.getBrands
);

router.post(
  "/add",
  authMiddleware.authenticate,
  authMiddleware.isAdmin,
  upload.single("logo"),
  brandsController.addBrand
);

router.delete(
  "/delete/:id",
  authMiddleware.authenticate,
  authMiddleware.isAdmin,
  brandsController.removeBrand
);

module.exports = router;
