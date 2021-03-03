const Product = require('../models/product');
const User = require('../models/user');

exports.getProducts = async function (query, page, limit) {
  try {
    return await Product.find(query);
  } catch (e) {
    throw Error('Error while Paginating Products');
  }
};

exports.getUsers = async function (query, page, limit) {
  try {
    return await User.find(query);
  } catch (e) {
    throw Error('Error while Paginating Users');
  }
};
