const Product = require("../models/Product");
const ErrorResponse = require("../utils/errorResponse");

/**
 * @desc    Get all Products
 * @route   GET /api/products
 * @access  Public
 */
exports.getProducts = async (req, res, next) => {
  return res.status(200).json(res.advancedResult);
};

/**
 * @desc    Get single product
 * @route   GET /api/products/:id
 * @access  Public
 */
exports.getProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new Error(`the product does not exist on the server`));
  }

  return res.status(200).json(product);
};

/**
 * @desc    Create new product
 * @route   POST /api/products
 * @access  Public
 */
exports.createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({ success: true, data: product });
};

/**
 * @desc    Update product
 * @route   PUT /api/products/:id
 * @access  Public
 */
exports.updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorResponse(404, `product with id ${req.params.id} does not exist in the server.`)
    );
  }

  // update the product
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: product });
};

/**
 * @desc    Delete product
 * @route   DELETE /api/products/:id
 * @access  Public
 */
exports.deleteProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorResponse(404, `product with id ${req.params.id} does not exist in the server.`)
    );
  }

  // remove the product
  product.remove();

  res
    .status(200)
    .json({ success: true, message: `product with id ${req.params.id} was deleted successfully` });
};
