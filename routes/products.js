const express = require("express");

const {
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/product");

const Product = require("../models/Product");

//! route: /api/products
const router = express.Router();

const advancedResults = require("../middleware/advancedResult");

router.route("/:id").get(getProduct).put(updateProduct).delete(deleteProduct);

router.route("/").get(advancedResults(Product, "products"), getProducts).post(createProduct);

module.exports = router;
