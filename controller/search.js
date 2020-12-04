/**
 * @desc    Search for products
 * @route   GET /api/search
 * @access  Public
 */
exports.search = async (req, res, next) => {
  return res.status(200).json(res.searchResult);
};
