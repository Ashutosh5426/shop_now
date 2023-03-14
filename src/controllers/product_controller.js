const { db } = require("../database/database_operations");
const {getDataById, compareProductValues} = require('../resources/functions');
const {queries} = require('../resources/queries');

db.run(queries.createProductTable);

let sql;

// POST /products: Add a new product
const createProduct = async (req, res) => {
  const {
    Name,
    Price,
    VendorID,
    CategoryID,
    CreationDate,
    UpdationDate,
    Variations,
    Attributes,
  } = req.body;
  try {
    sql =
      "INSERT INTO product (Name, Price, VendorID, CategoryID, CreationDate, UpdationDate, Variations, Attributes) VALUES(?, ?, ?, ?, ?, ?, ?, ?)";
    values = [
      Name,
      Price,
      VendorID,
      CategoryID,
      CreationDate,
      UpdationDate,
      Variations,
      Attributes,
    ];
    db.run(sql, values, (err) => {
      if (err) return console.error(err.message);
      return res.status(201).send("Stored Successfully");
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET /products: Get all products
const getProducts = async (req, res) => {
  try {
    sql = "SELECT * FROM product";
    values = [];
    db.all(sql, [], (err, rows) => {
      if (err) return console.error(err.message);
      if (rows.length > 0) return res.send(rows);
      return res.send("No Data Found");
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /products/:id: Get a specific product by ID
const getProductById = async (req, res) => {
  try {
    const values = [req.params.id];
    sql = "SELECT * FROM product WHERE ProductID = ?";
    db.all(sql, values, (err, rows) => {
      if (err) return console.error(err.message);
      if (rows.length > 0) return res.send(rows);
      return res.send("No data found with the given product id.");
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /products/:id: Update a product by ID
const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    let updationData = req.body;

    if (updationData) {
      let previousData = await getDataById(id, 'product', 'ProductID');
      updationData = compareProductValues(updationData, previousData);

      updationData.push(id);
      sql = `UPDATE product
        SET Name = ?,
            Price = ?,
            VendorID = ?,
            CategoryID = ?,
            CreationDate = ?,
            UpdationDate = ?,
            Variations = ?,
            Attributes = ?
        WHERE ProductID = ?;
        ;`;
      db.run(sql, updationData, (err) => {
        if (err) return console.error(err.message);
      });
    } else {
      res.status(404).json({ message: "Product not found" });
    }

    return res.send('Data Updated Successfully');
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /products/:id: Delete a products by ID
const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    sql = "DELETE FROM product WHERE ProductID = ?";
    db.run(sql, [id], (err) => {
      if (err) return console.error(err.message);
      return res.send("product deleted");
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
