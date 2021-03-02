const Mongoose = require('mongoose');

module.exports = Mongoose.model('User', new Mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true, min: 0 },
  ssn: {
    type: String, required: true, unique: true, min: 11, max: 11,
  },
  address: { type: String, required: false },
  phoneNumber: {
    type: String, required: false, min: 12, max: 12,
  },
}));
