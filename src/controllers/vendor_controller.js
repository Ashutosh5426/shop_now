const sqlite = require("sqlite3").verbose();
const { db } = require("../database/database_operations");

let sql = `CREATE TABLE IF NOT EXISTS vendor (
    VendorID INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    Phone TEXT,
    Address TEXT,
    City TEXT,
    State TEXT,
    Zip TEXT,
    Country TEXT,
    Type TEXT NOT NULL,
    CategoryID INTEGER,
    GSTNumber TEXT,
    FOREIGN KEY (CategoryID) REFERENCES product_category(CategoryID)
);`;

db.run(sql);

const getDataById = async (id) => {
  let result = await new Promise((resolve, reject) => {
    sql = "SELECT * FROM vendor WHERE VendorID = ?";
    db.all(sql, [id], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
  return result;
};

function compareValues(updationData, previousData) {
  previousData = previousData[0];

  if (updationData.Name == undefined) updationData.Name = previousData.Name;
  if (updationData.Phone == undefined) updationData.Phone = previousData.Phone;
  if (updationData.Address == undefined)
    updationData.Address = previousData.Address;
  if (updationData.City == undefined) updationData.City = previousData.City;
  if (updationData.State == undefined) updationData.State = previousData.State;
  if (updationData.Zip == undefined) updationData.Zip = previousData.Zip;
  if (updationData.Country == undefined)
    updationData.Country = previousData.Country;
  if (updationData.Type == undefined) updationData.Type = previousData.Type;
  if (updationData.CategoryID == undefined)
    updationData.CategoryID = previousData.CategoryID;
  if (updationData.GSTNumber == undefined)
    updationData.GSTNumber = previousData.GSTNumber;

  updationData = [
    updationData.Name,
    updationData.Phone,
    updationData.Address,
    updationData.City,
    updationData.State,
    updationData.Zip,
    updationData.Country,
    updationData.Type,
    updationData.CategoryID,
    updationData.GSTNumber
  ];

  return updationData;
}

// POST /vendors: Add a new vendor
const createVendor = async (req, res) => {
  // let data = req.body;
  const {
    Name,
    Phone,
    Address,
    City,
    State,
    Zip,
    Country,
    Type,
    CategoryId,
    GSTNumber,
  } = req.body;

  try {
    sql =
      "INSERT INTO vendor(Name, Phone, Address, City, State, Zip, Country, Type, CategoryID, GSTNumber) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    values = [
      Name,
      Phone,
      Address,
      City,
      State,
      Zip,
      Country,
      Type,
      CategoryId,
      GSTNumber,
    ];
    db.run(sql, values, (err) => {
      if (err) return console.error(err.message);
      return res.send("Stored Successfully");
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET /vendors: Get all vendors
const getVendors = async (req, res) => {
  try {
    sql = "SELECT * FROM vendor";
    values = [];
    db.all(sql, [], (err, rows) => {
      if (err) return console.error(err.message);
      rows.forEach((row) => {
        console.log(row);
      });
      // return res.send(rows);
      if (rows.length > 0) return res.send(rows);
      return res.send("No Vendors Found");
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /vendors/:id: Get a specific vendor by ID
const getVendorById = async (req, res) => {
  try {
    const values = [req.params.id];
    sql = "SELECT * FROM vendor WHERE VendorID = ?";
    db.all(sql, values, (err, rows) => {
      if (err) return console.error(err.message);
      rows.forEach((row) => {
        console.log(row);
      });
      if (rows.length > 0) return res.send(rows);
      return res.send("No Vendors Found with the given vendor id");
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /vendors/:id: Update a vendor by ID
const updateVendor = async (req, res) => {
  try {
    const id = req.params.id;
    let updationData = req.body;
    // console.log("update vendor called");
    // data = Object.values(data);
    if (updationData) {
      let previousData = await getDataById(id);
      updationData = compareValues(updationData, previousData);
      updationData.push(id);
      sql = `UPDATE vendor
            SET Name = ?,
                Phone = ?,
                Address = ?,
                City = ?,
                State = ?,
                Zip = ?,
                Country = ?,
                Type = ?,
                CategoryID = ?,
                GSTNumber = ?
            WHERE VendorID = ?;`;
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

// DELETE /vendors/:id: Delete a vendor by ID
const deleteVendor = async (req, res) => {
  try {
    const id = req.params.id;

    sql = "DELETE FROM vendor WHERE VendorID = ?";
    db.run(sql, [id], (err) => {
      if (err) return console.error(err.message);
      return res.send("Vendor deleted");
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createVendor,
  getVendors,
  getVendorById,
  updateVendor,
  deleteVendor,
};
