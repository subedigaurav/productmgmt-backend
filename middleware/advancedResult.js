const advancedResults = (model, populate) => async (req, res, next) => {
  let query = null;

  let reqQuery = { ...req.query };
  const removeFields = ["page", "limit"];
  removeFields.forEach((param) => delete reqQuery[param]);

  let queryString = JSON.stringify(reqQuery);

  // execute the query
  query = model.find(JSON.parse(queryString));

  //! pagination
  const page = parseInt(req.query.page, 10) || 1; // the page to show
  const limit = parseInt(req.query.limit, 10) || 5; // products per page
  const start = (page - 1) * limit;
  const end = page * limit;
  const total = await model.countDocuments(); // total products

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

  res.advancedResult = {
    success: true,
    count: total,
    pagination,
    data: result,
  };

  next();
};

module.exports = advancedResults;
