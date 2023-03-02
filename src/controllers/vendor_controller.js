// GET /vendors: Get all vendors
const getVendors = async (req, res) => {
    try {
      const vendors = await Vendor.find({});
      res.json(vendors);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // GET /vendors/:id: Get a specific vendor by ID
  const getVendor = async (req, res) => {
    try {
      const vendor = await Vendor.findById(req.params.id);
      res.json(vendor);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // POST /vendors: Add a new vendor
  const addVendor = async (req, res) => {
    const vendor = new Vendor({
      name: req.body.name,
      phone: req.body.phone,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      country: req.body.country,
      type: req.body.type,
      category: req.body.category,
      gstNumber: req.body.gstNumber,
    });
  
    try {
      const newVendor = await vendor.save();
      res.status(201).json(newVendor);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // PUT /vendors/:id: Update a vendor by ID
  const updateVendor = async (req, res) => {
    try {
      const vendor = await Vendor.findById(req.params.id);
  
      if (vendor) {
        vendor.name = req.body.name || vendor.name;
        vendor.phone = req.body.phone || vendor.phone;
        vendor.address = req.body.address || vendor.address;
        vendor.city = req.body.city || vendor.city;
        vendor.state = req.body.state || vendor.state;
        vendor.zip = req.body.zip || vendor.zip;
        vendor.country = req.body.country || vendor.country;
        vendor.type = req.body.type || vendor.type;
        vendor.category = req.body.category || vendor.category;
        vendor.gstNumber = req.body.gstNumber || vendor.gstNumber;
  
        const updatedVendor = await vendor.save();
        res.json(updatedVendor);
      } else {
        res.status(404).json({ message: 'Vendor not found' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // DELETE /vendors/:id: Delete a vendor by ID
  const deleteVendor = async (req, res) => {
    try {
      const vendor = await Vendor.findById(req.params.id);
  
      if (vendor) {
        await vendor.remove();
        res.json({ message: 'Vendor deleted' });
      } else {
        res.status(404).json({ message: 'Vendor not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  
  module.exports = {getVendors, getVendor, addVendor, updateVendor, deleteVendor};