const express = require("express");
const router = express.Router();
const brandsController = require("../../controllers/brandsController");
const authMiddleware = require("../../middlewares/authMiddleware");

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
  brandsController.addBrand
);

router.delete(
  "/delete/:id",
  authMiddleware.authenticate,
  authMiddleware.isAdmin,
  brandsController.removeBrand
);

router.put(
  "/edit/:id",
  authMiddleware.authenticate,
  authMiddleware.isAdmin,
  brandsController.editBrand
);

module.exports = router;
