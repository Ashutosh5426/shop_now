const { db } = require("../database/database_operations");

let sql = `CREATE TABLE IF NOT EXISTS Wishlist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INT NOT NULL,
    creation_date DATE NOT NULL,
    FOREIGN KEY (product_id) REFERENCES product(id)
  );`;

db.run(sql);

// GET /wishlist: Get all wishlist items
const getAllWishlistItems = async (req, res) => {
  try {
    sql = "SELECT * FROM wishlist";
    values = [];
    db.all(sql, [], (err, rows) => {
      if (err) return console.error(err.message);
      rows.forEach((row) => {
        console.log(row);
      });
      if (rows.length > 0) return res.send(rows);
      return res.send("No Data Found");
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /wishlist/:id: Get a specific wishlist item by ID
const getWishlistItemById = async (req, res) => {
  try {
    const values = [req.params.id];
    sql = "SELECT * FROM wishlist WHERE id = ?";
    db.all(sql, values, (err, rows) => {
      if (err) return console.error(err.message);
      rows.forEach((row) => {
        console.log(row);
      });
      if (rows.length > 0) return res.send(rows);
      return res.send("No Data Found");
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /wishlist: Add a new item to the wishlist
const createWishlistItem = async (req, res) => {
  let values = [req.body.id, req.body.ProductID, req.body.creationDate];
  try {
    sql = `INSERT INTO Wishlist (id, product_id, creation_date)
        VALUES (?, ?, ?);`;
    db.run(sql, values, (err) => {
      if (err) return console.error(err.message);
      return res.status(201).send("Stored Successfully");
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE /wishlist/:id: Delete a wishlist item by ID
const deleteWishlistItemById = async (req, res) => {
  try {
    const id = req.params.id;
    sql = "DELETE FROM wishlist WHERE id = ?";
    db.run(sql, [id], (err) => {
      if (err) return console.error(err.message);
      return res.send("wishlist item deleted");
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllWishlistItems,
  getWishlistItemById,
  createWishlistItem,
  deleteWishlistItemById,
};
