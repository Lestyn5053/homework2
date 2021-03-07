const User = require('../models/user');

exports.getUsers = async function (query) {
  try {
    return await User.find(query).select('-_id -__v');
  } catch (e) {
    throw Error(e.message);
  }
};

exports.getUserBySSN = async function (query) {
  try {
    return await User.findOne({ ssn: query.params.ssn }).select('-_id -__v');
  } catch (e) {
    throw Error(e.message);
  }
};

exports.postUser = async function (query) {
  try {
    return await new User(query).save();
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.deleteUsers = async function (query) {
  try {
    return await User.deleteMany(query);
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.deleteUserBySSN = async function (query) {
  try {
    return await User.deleteOne({ ssn: query.params.ssn });
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.putUser = async function (query) {
  const { ssn } = query.params;
  const user = query.body;
  user.ssn = ssn;
  try {
    return await User.findOneAndReplace({ ssn }, user, {
      upsert: true,
    });
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.patchUser = async function (query) {
  const { ssn } = query.params;
  const user = query.body;
  user.ssn = ssn;
  try {
    return await User.findOneAndUpdate({ ssn }, user, {
      new: true,
    }).select('-_id -__v');
  } catch (e) {
    throw new Error(e.message);
  }
};
