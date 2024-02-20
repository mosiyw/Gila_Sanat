// routes/addressRoutes.js
const express = require("express");
const router = express.Router();
const addressController = require("../../controllers/addressController");
const authMiddleware = require("../../middlewares/authMiddleware");

router.use(authMiddleware.authenticate);

router.post("/add", addressController.addAddress);
router.delete("/:index", addressController.removeAddress);
router.get("/", addressController.getAddresses);
router.get("/test", (req, res) => {
  res.send("test");
});
router.put("/:index", addressController.editAddress);

module.exports = router;
