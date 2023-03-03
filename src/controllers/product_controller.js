const { db } = require('../database/database_operations');

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
`

db.run(sql);


// POST /products: Add a new product
const createProduct = async (req, res) => {
    let data = req.body;
    const { Name, Price, VendorID, CategoryID, CreationDate, UpdationDate, Variations, Attributes } = req.body;
    try {

        sql = 'INSERT INTO product (Name, Price, VendorID, CategoryID, CreationDate, UpdationDate, Variations, Attributes) VALUES(?, ?, ?, ?, ?, ?, ?, ?)';
        values = [Name, Price, VendorID, CategoryID, CreationDate, UpdationDate, Variations, Attributes];
        db.run(sql, values, (err) => {
            if (err) return console.error(err.message);
            return res.status(201).send('Stored Successfully');
        })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// GET /products: Get all products
const getProducts = async (req, res) => {
    try {
        sql = 'SELECT * FROM product';
        values = [];
        db.all(sql, [], (err, rows) => {
            if (err) return console.error(err.message);
            rows.forEach(row => {
                console.log(row);
            })
            return res.send(rows);
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /products/:id: Get a specific product by ID
const getProductById = async (req, res) => {
    try {
        const values = [req.params.id];
        sql = 'SELECT * FROM product WHERE ProductID = ?';
        db.all(sql, values, (err, rows) => {
            if (err) return console.error(err.message);
            rows.forEach(row => {
                console.log(row);
            })
            return res.send(rows);
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// PUT /products/:id: Update a product by ID
const updateProduct = async (req, res) => {
    try {console.log('update product called')
        const id = req.params.id;
        let data = req.body;
        data = Object.values(data);
        if (data) {
            data.push(id);
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
            ;`
            db.run(sql, data, (err) => {
                if (err) return console.error(err.message);
                res.send('Data updated successfully')
            })
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE /products/:id: Delete a products by ID
const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
console.log('deleteProeuc called')
            sql = 'DELETE FROM product WHERE ProductID = ?';
            db.run(sql, [id], (err) => {
                if (err) return console.error(err.message);
                return res.send('product deleted')
            })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { createProduct, getProducts, getProductById, updateProduct, deleteProduct };