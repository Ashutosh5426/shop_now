// Import the Cart model
const Cart = require('../models/cart_model');

// GET /cart: Get all cart items
const getCarts = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.json(carts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /cart/:id: Get a specific cart item by ID
const getACart = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ message: 'Cart item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /cart: Add a new item to the cart
const addCart = async (req, res) => {
  const cart = new Cart({
    product: req.body.product,
    quantity: req.body.quantity,
    productVariation: req.body.productVariation,
    discountApplied: req.body.discountApplied,
    grandTotal: req.body.grandTotal,
    subTotal: req.body.subTotal,
    taxTotal: req.body.taxTotal,
    creationDate: req.body.creationDate,
    cartType: req.body.cartType,
  });

  try {
    const newCart = await cart.save();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT /cart/:id: Update a cart item by ID
const updateCart = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (cart) {
      cart.product = req.body.product;
      cart.quantity = req.body.quantity;
      cart.productVariation = req.body.productVariation;
      cart.discountApplied = req.body.discountApplied;
      cart.grandTotal = req.body.grandTotal;
      cart.subTotal = req.body.subTotal;
      cart.taxTotal = req.body.taxTotal;
      cart.creationDate = req.body.creationDate;
      cart.cartType = req.body.cartType;

      const updatedCart = await cart.save();
      res.json(updatedCart);
    } else {
      res.status(404).json({ message: 'Cart item not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /cart/:id: Delete a cart item by ID
const deleteCart = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (cart) {
      await cart.remove();
      res.json({ message: 'Cart item deleted' });
    } else {
      res.status(404).json({ message: 'Cart item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {getCarts, getACart, addCart, updateCart, deleteCart};