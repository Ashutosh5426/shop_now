const sqlite = require("sqlite3").verbose();
const { db } = require("../database/database_operations");

let sql = `CREATE TABLE IF NOT EXISTS vendor_category (
    id INTEGER PRIMARY KEY,
    name TEXT,
    creation_date DATE
    );`;

db.run(sql);

// POST /vendorsCategory: Add a new vendor Category
const createVendorCategory = async (req, res) => {
  const category = req.body.name;
  console.log(category);
  try {
    sql = "INSERT INTO vendor_category(name) VALUES(?)";
    values = [category];
    db.run(sql, values, (err) => {
      if (err) return console.error(err.message);
      return res.send("Stored Successfully");
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

// GET /vendorsCategory: Get all vendor Category
const getVendorCategories = async (req, res) => {
  try {
    sql = "SELECT * FROM vendor_category";
    values = [];
    db.all(sql, [], (err, rows) => {
      if (err) return console.error(err.message);
      rows.forEach((row) => {
        console.log(row);
      });
      if (rows.length > 0) return res.send(rows);
      return res.send("No Data Found");
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createVendorCategory, getVendorCategories };
