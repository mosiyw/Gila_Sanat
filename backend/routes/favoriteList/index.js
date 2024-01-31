const express = require("express");
const router = express.Router();
const favoriteListController = require("../../controllers/favoritesController");
const authMiddleware = require("../../middlewares/authMiddleware");

// Apply authentication middleware to all routes in this file
router.use(authMiddleware.authenticate);

router.post("/add", favoriteListController.addProductToFavorites);

router.delete("/remove", favoriteListController.removeProductFromFavorites);

router.get("/", favoriteListController.getFavoriteList);

module.exports = router;
