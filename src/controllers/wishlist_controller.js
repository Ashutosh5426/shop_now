 // GET /wishlist: Get all wishlist items
const getAllWishlistItems = async (req, res) => {
    try {
      const wishlistItems = await Wishlist.find();
      res.status(200).json(wishlistItems);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  // GET /wishlist/:id: Get a specific wishlist item by ID
  const getWishlistItemById = async (req, res) => {
    try {
      const wishlistItem = await Wishlist.findById(req.params.id);
      if (!wishlistItem) {
        res.status(404).json({ message: "Wishlist item not found" });
        return;
      }
      res.status(200).json(wishlistItem);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  // POST /wishlist: Add a new item to the wishlist
  const addWishlistItem = async (req, res) => {
    const wishlistItem = new Wishlist({
      product: req.body.product,
      creation_date: new Date(),
    });
  
    try {
      const newWishlistItem = await wishlistItem.save();
      res.status(201).json(newWishlistItem);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  
  // DELETE /wishlist/:id: Delete a wishlist item by ID
  const deleteWishlistItemById = async (req, res) => {
    try {
      const deletedWishlistItem = await Wishlist.findByIdAndRemove(req.params.id);
      if (!deletedWishlistItem) {
        res.status(404).json({ message: "Wishlist item not found" });
        return;
      }
      res.status(200).json({ message: "Wishlist item deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  module.exports = {getAllWishlistItems, getWishlistItemById, addWishlistItem, deleteWishlistItemById};