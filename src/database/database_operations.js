const sqlite = require('sqlite3').verbose();

// connect to db
let db;
try{
    db = new sqlite.Database('./shopping.db');
    console.log('Database connected successfully...');
} catch(err){
    console.error(err.message);
}

module.exports = { db };
