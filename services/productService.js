const Product = require('../models/product');

exports.getProducts = async function (query) {
  try {
    return await Product.find(query).select('-_id -__v');
  } catch (e) {
    throw Error(e.message);
  }
};

exports.getProductBySKU = async function (query) {
  try {
    return await Product.findOne({ sku: query.params.sku }).select('-_id -__v');
  } catch (e) {
    throw Error(e.message);
  }
};

exports.postProducts = async function (query) {
  try {
    return await new Product(query).save();
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.deleteProducts = async function (query) {
  try {
    return await Product.deleteMany(query);
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.deleteProductBySKU = async function (query) {
  try {
    return await Product.deleteOne({ sku: query.params.sku });
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.putProduct = async function (query) {
  const { sku } = query.params;
  const product = query.body;
  product.sku = sku;
  try {
    return await Product.findOneAndReplace({ sku }, product, {
      upsert: true,
    });
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.patchProduct = async function (query) {
  const { sku } = query.params;
  const product = query.body;
  product.sku = sku;
  try {
    return await Product.findOneAndUpdate({ sku }, product, {
      new: true,
    }).select('-_id -__v');
  } catch (e) {
    throw new Error(e.message);
  }
};
