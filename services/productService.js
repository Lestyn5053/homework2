const Product = require('../models/product');

exports.getProducts = async function (query) {
  try {
    return await Product.find(query);
  } catch (e) {
    throw Error(e.message);
  }
};
