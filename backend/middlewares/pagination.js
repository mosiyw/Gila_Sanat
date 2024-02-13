const Product = require("../models/Product"); // replace with your actual path

module.exports = async function pagination(req, res, next) {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const startIndex = (page - 1) * pageSize;

  const total = await Product.countDocuments({});
  const totalPages = Math.ceil(total / pageSize);

  req.pagination = {
    pageSize,
    startIndex,
    totalPages,
  };

  next();
};
