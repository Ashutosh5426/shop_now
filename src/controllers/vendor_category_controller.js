const VendorCategory = require('../models/vendor_category_model');

// GET /vendor-categories: Get all vendor categories
const getVendorCategories = async (req, res) => {
  try {
    const vendorCategories = await VendorCategory.find();
    res.status(200).json(vendorCategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /vendor-categories/:id: Get a specific vendor category by ID
const getVendorCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const vendorCategory = await VendorCategory.findById(id);
    res.status(200).json(vendorCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /vendor-categories: Add a new vendor category
const addVendorCategory = async (req, res) => {
  const { name } = req.body;
  const vendorCategory = new VendorCategory({ name });

  try {
    const newVendorCategory = await vendorCategory.save();
    res.status(201).json(newVendorCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT /vendor-categories/:id: Update a vendor category by ID
const updateVendorCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const vendorCategory = await VendorCategory.findById(id);
    if (vendorCategory) {
      vendorCategory.name = name;
      const updatedVendorCategory = await vendorCategory.save();
      res.status(200).json(updatedVendorCategory);
    } else {
      res.status(404).json({ message: 'Vendor category not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /vendor-categories/:id: Delete a vendor category by ID
const deleteVendorCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const vendorCategory = await VendorCategory.findById(id);
    if (vendorCategory) {
      await vendorCategory.remove();
      res.status(200).json({ message: 'Vendor category deleted' });
    } else {
      res.status(404).json({ message: 'Vendor category not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getVendorCategories,
  getVendorCategory,
  addVendorCategory,
  updateVendorCategory,
  deleteVendorCategory,
};
