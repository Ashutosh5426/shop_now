sqlite3 products.db < src/sql/product_category.sql
sqlite3 products.db < src/sql/vendor_category.sql

//create a file db;

const sqlite = require('sqlite3').verbose();
let sql;

//connect to db
const db = new sqlite.Database('./test.db', sqlite.OPEN_READWRITE, (err) => {
    if(err) return console.error(err.message);
})

//create table
sql = 'CREATE TABLE users(id INTEGER PRIMARY KEY, name, username, password, email)';
db.run(sql);

//drop table
db.run('DROP TABLE users');

//insert data
sql = 'INSERT INTO users(name, username, password, email) VALUES(?, ?, ?, ?)';
db.run(sql, ['Ashutosh', 'ashutosh5428', '12345', 'ashutoshgupta@mail.com'], (err) => {
    if(err) return console.error(err.message);
})

//query data
sql = 'SELECT * FROM users';
db.all(sql, [], (err, rows) => {
    if(err) return console.error(err.message);
    rows.forEach(row => {
        console.log(row);
    })
})

//update data
sql = 'UPDATE users SET name = ? WHERE id = ?';
db.run(sql, ['ashu', 1, ], (err) => {
    if(err) return console.error(err.message);
})

//delete data
sql = 'DELETE FROM users  WHERE id = ?';
db.run(sql, [1 ], (err) => {
    if(err) return console.error(err.message);
}) 