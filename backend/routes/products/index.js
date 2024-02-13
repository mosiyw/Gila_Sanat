const express = require("express");
const router = express.Router();
const productController = require("../../controllers/productController");
const authMiddleware = require("../../middlewares/authMiddleware");
const upload = require("../../middlewares/uploadMiddleware");
const pagination = require("../../middlewares/pagination");

router.get("/top-selling", (req, res) => {
  productController.getTopSellingProducts(req, res);
});
router.get("/list", productController.getProductsByIds);

router.get("/similar/:id", productController.getSimilarProducts);

router.get("/category", (req, res) => {
  productController.getProductsByCategory(req, res);
});

router.get("/brand", (req, res) => {
  productController.getProductsByBrand(req, res);
});

router.get(
  "/admin/search",
  authMiddleware.authenticate,
  authMiddleware.isAdmin,
  (req, res) => {
    productController.searchProductsAdmin(req, res);
  }
);

router.get("/", async (req, res) => {
  productController.getActiveProducts(req, res);
});

router.get(
  "/allproduct",
  authMiddleware.authenticate,
  authMiddleware.isAdmin,
  pagination,
  async (req, res) => {
    productController.getAllProducts(req, res);
  }
);

router.get("/search", (req, res) => {
  productController.searchProducts(req, res);
});

router.get("/:id", (req, res) => {
  productController.getProductById(req, res);
});

router.get(
  "/admin/:id",
  authMiddleware.authenticate,
  authMiddleware.isAdmin,
  productController.getProductByIdAmin
);

router.post(
  "/",
  authMiddleware.authenticate,
  authMiddleware.isAdmin,
  (req, res) => {
    productController.createProduct(req, res);
  }
);

router.put(
  "/:id",
  authMiddleware.authenticate,
  authMiddleware.isAdmin,
  (req, res) => {
    productController.updateProduct(req, res);
  }
);

router.delete(
  "/:id",
  authMiddleware.authenticate,
  authMiddleware.isAdmin,
  (req, res) => {
    productController.deleteProduct(req, res);
  }
);

router.post(
  "/:id/upload-image",
  // authMiddleware.authenticate,
  // authMiddleware.isAdmin,
  upload.single("image"),
  productController.uploadProductImage
);

module.exports = router;
