const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add product name."],
    trim: true,
    maxLength: [50, "Product name cannot be more than 50 characters."],
  },
  code: {
    type: String,
    required: [true, "Please add product code."],
  },
  category: {
    type: String,
    required: true,
    enum: ["Food", "Electronics", "Accessories", "DIY"],
  },
  description: {
    type: String,
    required: [true, "Please add product description"],
    maxLength: [250, "Description exceeded max length."],
  },
  status: {
    type: String,
    required: true,
    enum: ["Available", "Unavailable"],
  },
});

module.exports = mongoose.model("Product", ProductSchema);
