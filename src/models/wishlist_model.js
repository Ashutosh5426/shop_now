const mongoose = require('mongoose');

const WishlistSchema = new mongoose.Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    createdDate: { type: Date, default: Date.now },
  });
  
  // example usage
  const Wishlist = mongoose.model('Wishlist', WishlistSchema);
  