const express = require("express");
const product = require('../controllers/product_controller');
const productCategory = require('../controllers/product_category_controller');
const vendorCategory = require('../controllers/vendor_category_controller');
const vendor = require('../controllers/vendor_controller');
const cart = require('../controllers/cart_controller');
const wishlist = require('../controllers/wishlist_controller');


const router = express.Router();

// <------------------------------------------------------------------------->
// Product Endpoints:

// POST /products: Add a new product
router.post('/products', product.createProduct);

// GET /products: Get all products
router.get('/products', product.getProducts);

// GET /products/:id: Get a specific product by ID
router.get('/products/:id', product.getProductById);

// PUT /products/:id: Update a product by ID
router.put('/products/:id', product.updateProduct);

// DELETE /products/:id: Delete a product by ID
router.delete('/products/:id', product.deleteProduct);


// <------------------------------------------------------------------------->
// Vendor Endpoints:

// POST /vendors: Add a new vendor
router.post('/vendors', vendor.createVendor);

// GET /vendors: Get all vendors
router.get('/vendors', vendor.getVendors);

// GET /vendors/:id: Get a specific vendor by ID
router.get('/vendors/:id', vendor.getVendorById);

// PUT /vendors/:id: Update a vendor by ID
router.put('/vendors/:id', vendor.updateVendor);

// DELETE /vendors/:id: Delete a vendor by ID
router.delete('/vendors/:id', vendor.deleteVendor);


// <------------------------------------------------------------------------->
// Product Category Endpoints:

// POST /categories: Add a new category
router.post('/product-categories', productCategory.createProductCategory);

// GET /categories: Get all categories
router.get('/product-categories', productCategory.getProductCategories);


// <------------------------------------------------------------------------->

// Vendor Category Endpoints:

// POST /vendor-categories: Add a new vendor category
router.post('/vendor-categories', vendorCategory.createVendorCategory);

// GET /vendor-categories: Get all vendor categories
router.get('/vendor-categories', vendorCategory.getVendorCategories);


// <------------------------------------------------------------------------->
// Cart Endpoints:

// POST /cart: Add a new item to the cart
router.post('/carts', cart.createCart);

// GET /cart: Get all cart items
router.get('/carts', cart.getCarts);

// GET /cart/:id: Get a specific cart item by ID
router.get('/carts/:id', cart.getACart);

// PUT /cart/:id: Update a cart item by ID
router.put('/carts/:id', cart.updateCart);

// DELETE /cart/:id: Delete a cart item by ID
router.delete('/carts/:id', cart.deleteCart);


// <------------------------------------------------------------------------->
// Wishlist Endpoints:

// POST /wishlist: Add a new item to the wishlist
router.post('/wishlist', wishlist.createWishlistItem);

// GET /wishlist: Get all wishlist items
router.get('/wishlist', wishlist.getAllWishlistItems);

// GET /wishlist/:id: Get a specific wishlist item by ID
router.get('/wishlist/:id', wishlist.getWishlistItemById);

// DELETE /wishlist/:id: Delete a wishlist item by ID
router.delete('/wishlist/:id', wishlist.deleteWishlistItemById);


router.all("/*", async function (req, res) {
    res.status(404).send({ status: false, msg: "Page Not Found!" });
});

// <------------------------------------------------------------------------->
// Exporting endpoint routes
module.exports = router;