const express = require("express");
const router = express.Router();

const product = require('../controllers/product_controller');
const productCategory = require('../controllers/product_category_controller');
const vendor = require('../controllers/vendor_controller');
const vendorCategory = require('../controllers/vendor_category_controller');
const cart = require('../controllers/cart_controller');
const wishlist = require('../controllers/wishlist_controller');


// <------------------------------------------------------------------------->
// Product Endpoints:

// GET /products: Get all products
router.get('/products', product.getAllProducts);

// GET /products/:id: Get a specific product by ID
router.get('/products/:id', product.getProduct);

// POST /products: Add a new product
router.post('/products', product.addProduct);

// PUT /products/:id: Update a product by ID
router.put('/products/:id', product.updateProduct);

// DELETE /products/:id: Delete a product by ID
router.delete('/products/:id', product.deleteProduct);


// <------------------------------------------------------------------------->
// Vendor Endpoints:

// GET /vendors: Get all vendors
router.get('/vendors', vendor.getVendors);

// GET /vendors/:id: Get a specific vendor by ID
router.get('/vendors/:id', vendor.getVendor);

// POST /vendors: Add a new vendor
router.post('/vendors', vendor.addVendor);

// PUT /vendors/:id: Update a vendor by ID
router.put('/vendors/:id', vendor.updateVendor);

// DELETE /vendors/:id: Delete a vendor by ID
router.delete('/vendors/:id', vendor.deleteVendor);


// <------------------------------------------------------------------------->
// Product Category Endpoints:

// GET /categories: Get all categories
router.get('/categories', productCategory.getCategories);

// GET /categories/:id: Get a specific category by ID
router.get('/categories/:id', productCategory.getCategory);

// POST /categories: Add a new category
router.post('/categories', productCategory.addCategory);

// PUT /categories/:id: Update a category by ID
router.put('/categories/:id', productCategory.updateCategory);

// DELETE /categories/:id: Delete a category by ID
router.get('/categories/:id', productCategory.deleteCategory);


// <------------------------------------------------------------------------->
// Vendor Category Endpoints:

// GET /vendor-categories: Get all vendor categories
router.get('/vendor-categories', vendorCategory.getVendorCategories);

// GET /vendor-categories/:id: Get a specific vendor category by ID
router.get('/vendors-categories/:id', vendorCategory.getVendorCategory);

// POST /vendor-categories: Add a new vendor category
router.post('/vendor-categories', vendorCategory.addVendorCategory);

// PUT /vendor-categories/:id: Update a vendor category by ID
router.put('/vendor-categories/:id', vendorCategory.updateVendorCategory);

// DELETE /vendor-categories/:id: Delete a vendor category by ID
router.put('/vendor-categories/:id', vendorCategory.deleteVendorCategory);


// <------------------------------------------------------------------------->
// Cart Endpoints:

// GET /cart: Get all cart items
router.get('/cart', cart.getCarts);

// GET /cart/:id: Get a specific cart item by ID
router.get('/cart/:id', cart.getACart);

// POST /cart: Add a new item to the cart
router.post('/cart', cart.addCart);

// PUT /cart/:id: Update a cart item by ID
router.put('/cart:id', cart.updateCart);

// DELETE /cart/:id: Delete a cart item by ID
router.delete('/cart/:id', cart.deleteCart);


// <------------------------------------------------------------------------->
// Wishlist Endpoints:

// GET /wishlist: Get all wishlist items
router.get('/wishlist', wishlist.getAllWishlistItems);

// GET /wishlist/:id: Get a specific wishlist item by ID
router.get('/wishlist:id', wishlist.getWishlistItemById);

// POST /wishlist: Add a new item to the wishlist
router.post('/wishlist', wishlist.addWishlistItem);

// DELETE /wishlist/:id: Delete a wishlist item by ID
router.delete('/wishlist/:id', wishlist.deleteWishlistItemById);


router.all("/*", async function (req, res) {
    res.status(404).send({ status: false, msg: "Page Not Found!" });
});

module.exports = router;