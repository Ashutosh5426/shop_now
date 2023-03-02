const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor'
  },
  creationDate: {
    type: Date,
    default: Date.now
  },
  updationDate: {
    type: Date,
    default: Date.now
  },
  variations: {
    type: [String]
  },
  attributes: {
    type: [String]
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;