// Import the Product model from the database schema
const Product = require('../models/product_model');

// GET /products: Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// GET /products/:id: Get a specific product by ID
const getProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// POST /products: Add a new product
const addProduct = async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    vendor: req.body.vendor,
    category: req.body.category,
    variations: req.body.variations,
    attributes: req.body.attributes
  });
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// PUT /products/:id: Update a product by ID
const updateProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    product.vendor = req.body.vendor || product.vendor;
    product.category = req.body.category || product.category;
    product.variations = req.body.variations || product.variations;
    product.attributes = req.body.attributes || product.attributes;
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// DELETE /products/:id: Delete a product by ID
const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await product.remove();
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  getAllProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct
}
