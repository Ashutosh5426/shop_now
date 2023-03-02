const mongoose = require('mongoose');

const vendorCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  creationDate: {
    type: Date,
    required: true,
    default: Date.now
  }
});

const VendorCategory = mongoose.model('VendorCategory', vendorCategorySchema);

module.exports = VendorCategory;
