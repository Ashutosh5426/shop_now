queries = {};

// To create product table
queries.createProductTable = `CREATE TABLE IF NOT EXISTS product (
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

// To create vendor table
queries.createVendorTable = `CREATE TABLE IF NOT EXISTS vendor (
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

// To create cart table
queries.createCartTable = `CREATE TABLE IF NOT EXISTS cart (
    CartID INTEGER PRIMARY KEY AUTOINCREMENT,
    Quantity INTEGER NOT NULL,
    Variation TEXT,
    Discount REAL,
    GrandTotal REAL NOT NULL,
    SubTotal REAL NOT NULL,
    TaxTotal REAL NOT NULL,
    CreationDate TEXT NOT NULL,
    CartType TEXT NOT NULL,
    FOREIGN KEY (ProductID) REFERENCES product(ProductID)
);`;

module.exports = {queries};