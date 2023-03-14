const sqlite = require('sqlite3').verbose();

// connect to db
const db = new sqlite.Database('./shopping.db', (err) => {
    if (err) return console.error(err.message);
});

// // connect to db
// let db;
// try{
//     db = new sqlite.Database('./shopping.db');
//     return console.log('Database connected successfully...');
// } catch(err){
//     return console.error(err.message);
// }

module.exports = { db };











