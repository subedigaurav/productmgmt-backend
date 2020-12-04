const express = require("express");
const Product = require("../models/Product");
const { search } = require("../controller/search");

//! route: /api/search
const router = express.Router();
const searchProducts = require("../middleware/searchProducts");

router.route("/").get(searchProducts(Product, "products"), search);

module.exports = router;
