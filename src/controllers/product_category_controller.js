const { db } = require('../database/database_operations');


let sql = `CREATE TABLE IF NOT EXISTS product_category (
    id INTEGER PRIMARY KEY,
    name TEXT,
    creation_date DATE
    );`;

db.run(sql);


// POST /productcategories: Add a new product category
const createProductCategory = async (req, res) => {
    const category = req.body.name;
    console.log(category);
    try {
        sql = 'INSERT INTO product_category(name) VALUES(?)';
        values = [category];
        db.run(sql, values, (err) => {
            if (err) return console.error(err.message);
            return res.send('Stored Successfully');
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
};


// GET /productcategories: Get all product categories
const getProductCategories = async (req, res) => {
    try {
        sql = 'SELECT * FROM product_category';
        values = [];
        db.all(sql, [], (err, rows) => {
            if(err) return console.error(err.message);
            rows.forEach(row => {
                console.log(row);
            })
            return res.send(rows);
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createProductCategory, getProductCategories };