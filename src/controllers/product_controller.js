const { db } = require("../database/database_operations");

let sql = `CREATE TABLE IF NOT EXISTS product (
    ProductID INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    Price REAL NOT NULL,
    VendorID INTEGER NOT NULL,
    CategoryID INTEGER NOT NULL,
    CreationDate TEXT NOT NULL,
    UpdationDate TEXT NOT NULL,
    Variations TEXT,
    Attributes TEXT,
    FOREIGN KEY (VendorID) REFERENCES vendor(VendorID),
    FOREIGN KEY (CategoryID) REFERENCES product_category(CategoryID)
);
`;

db.run(sql);

const getDataById = async (id) => {
  let result = await new Promise((resolve, reject) => {
    sql = "SELECT * FROM product WHERE ProductID = ?";
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
  if (updationData.Price == undefined) updationData.Price = previousData.Price;
  if (updationData.VendorID == undefined)
    updationData.VendorID = previousData.VendorID;
  if (updationData.CategoryID == undefined)
    updationData.CategoryID = previousData.CategoryID;
  if (updationData.CreationDate == undefined)
    updationData.CreationDate = previousData.CreationDate;
  if (updationData.UpdationDate == undefined)
    updationData.UpdationDate = previousData.UpdationDate;
  if (updationData.Variations == undefined)
    updationData.Variations = previousData.Variations;
  if (updationData.Attributes == undefined)
    updationData.Attributes = previousData.Attributes;
    
  updationData = [
    updationData.Name,
    updationData.Price,
    updationData.VendorID,
    updationData.CategoryID,
    updationData.CreationDate,
    updationData.UpdationDate,
    updationData.Variations,
    updationData.Attributes,
  ];
  
// console.log(updationData)
  return updationData;
}

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
      //   rows.forEach((row) => {
      //     console.log(row);
      //   });
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
      //   rows.forEach((row) => {
      //     console.log(row);
      //   });
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

    // let previousData = await getDataById(id);
    // updationData = compareValues(updationData, previousData);
    // console.log(updationData, 'updation data message');

    if (updationData) {
      let previousData = await getDataById(id);
      updationData = compareValues(updationData, previousData);
    //   console.log(updationData, 'updation data message');

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
        // console.log(updationData, '1o dgts');
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
