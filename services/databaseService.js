const Product = require('../models/product');
const User = require('../models/user');

exports.getProducts = async function (query) {
  try {
    return await Product.find(query);
  } catch (e) {
    throw Error(e.message);
  }
};

exports.getUsers = async function (query) {
  try {
    return await User.find(query);
  } catch (e) {
    throw Error(e.message);
  }
};

exports.getUserBySSN = async function (query) {
  try {
    await User.findOne({ ssn: query.params.ssn }).select('-_id -__v');
  } catch (e) {
    throw Error(e.message);
  }
};

exports.postUser = async function (query) {
  try {
    return await User.save(query.body);
  } catch (e) {
    throw new Error(e.message);
  }
};
