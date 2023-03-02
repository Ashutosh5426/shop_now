const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    variation: { type: String, default: '' },
    discount: { type: Number, default: 0 },
    grandTotal: { type: Number, required: true },
    subTotal: { type: Number, required: true },
    taxTotal: { type: Number, required: true },
    createdDate: { type: Date, default: Date.now },
    cartType: { type: String, enum: ['guest', 'registered'], required: true }
  });
  
  // example usage
  const Cart = mongoose.model('Cart', CartSchema);
  