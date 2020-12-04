const searchProducts = (model, populate) => async (req, res, next) => {
  let query = null;

  let reqQuery = { ...req.query };
  const removeFields = ["page", "limit"];
  removeFields.forEach((param) => delete reqQuery[param]);

  const buildQuery = () => {
    if (req.query.sort) {
      if (req.query.field == "category") {
        query = model.find({
          category: {
            $regex: new RegExp(req.query.value),
            $options: "i",
          },
        });
      } else if (req.query.field == "status") {
        query = model.find({
          status: {
            $regex: new RegExp("^" + req.query.value),
            $options: "i",
          },
        });
      }
    } else {
      query = model.find({
        $or: [
          {
            name: {
              $regex: new RegExp(req.query.q),
              $options: "i",
            },
          },
          {
            code: {
              $regex: new RegExp(req.query.q),
              $options: "i",
            },
          },
          {
            category: {
              $regex: new RegExp(req.query.q),
              $options: "i",
            },
          },
          {
            description: {
              $regex: new RegExp(req.query.q),
              $options: "i",
            },
          },
        ],
      });
    }
  };

  buildQuery();

  //! pagination
  const page = parseInt(req.query.page, 10) || 1; // the page to show
  const limit = parseInt(req.query.limit, 10) || 5; // products per page
  const start = (page - 1) * limit;
  const end = page * limit;
  const total = await query.countDocuments();

  // rebuild query
  buildQuery();
  query = query.skip(start).limit(limit);

  // execute the query
  const result = await query;

  // pagination result
  const pagination = {};

  if (end < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (start > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.searchResult = {
    success: true,
    count: total,
    pagination,
    data: result,
  };

  next();
};

module.exports = searchProducts;
