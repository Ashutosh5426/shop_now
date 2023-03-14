const { db } = require("../database/database_operations");
const {getDataById, compareCartValues} = require('../resources/functions');
const {queries} = require('../resources/queries');

db.run(queries.createCartTable);
let sql;

// GET /cart: Get all cart items
const getCarts = async (req, res) => {
  try {
    sql = "SELECT * FROM cart";
    values = [];
    db.all(sql, values, (err, rows) => {
      if (err) return console.error(err.message);
      if (rows.length > 0) return res.send(rows);
      return res.send("No Data Found");
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /cart/:id: Get a specific cart item by ID
const getACart = async (req, res) => {
  try {
    const values = [req.params.id];
    sql = "SELECT * FROM cart WHERE CartId = ?";
    db.all(sql, values, (err, rows) => {
      if (err) return console.error(err.message);
      if (rows.length > 0) return res.send(rows);
      return res.send("No Data Found");
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /cart: Add a new item to the cart
const createCart = async (req, res) => {
  const {
    ProductId,
    Quantity,
    Variation,
    Discount,
    GrandTotal,
    SubTotal,
    TaxTotal,
    CreationDate,
    CartType,
  } = req.body;
  try {
    sql =
      "INSERT INTO cart (ProductId, Quantity, Variation, Discount, GrandTotal, SubTotal, TaxTotal, CreationDate, CartType) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)";
    values = [
      ProductId,
      Quantity,
      Variation,
      Discount,
      GrandTotal,
      SubTotal,
      TaxTotal,
      CreationDate,
      CartType,
    ];
    db.run(sql, values, (err) => {
      if (err) return console.error(err.message);
      return res.status(201).send("Stored Successfully");
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT /cart/:id: Update a cart item by ID
const updateCart = async (req, res) => {
  try {
    const id = req.params.id;
    let updationData = req.body;
    if (updationData) {
      let previousData = await getDataById(id, 'cart', 'CartID');
      updationData = compareCartValues(updationData, previousData);
      updationData.push(id);

      sql = `UPDATE cart
            SET
            Quantity = ?,
            Variation = ?,
            Discount = ?,
            GrandTotal = ?,
            SubTotal = ?,
            TaxTotal = ?,
            CreationDate = ?,
            CartType = ?
            WHERE CartID = ?;
            `;
      db.run(sql, updationData, (err) => {
        if (err) return console.error(err.message);
        res.send("Data updated successfully");
      });
    } else {
      res.status(404).json({ message: "Vendor not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /cart/:id: Delete a cart item by ID
const deleteCart = async (req, res) => {
  try {
    const id = req.params.id;
    sql = "DELETE FROM cart WHERE CartID = ?";
    db.run(sql, [id], (err) => {
      if (err) return console.error(err.message);
      return res.send("cart deleted");
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCarts, getACart, createCart, updateCart, deleteCart };
