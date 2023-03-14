const { db } = require("../database/database_operations");

const getDataById = async (id, tableName, itemId) => {
  let result = await new Promise((resolve, reject) => {
    sql = `SELECT * FROM ${tableName} WHERE ${itemId} = ?`;
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

function compareProductValues(updationData, previousData) {
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
    return updationData;
  }

  function compareVendorValues(updationData, previousData) {
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

  function compareCartValues(updationData, previousData) {
    previousData = previousData[0];
  
    if (updationData.Quantity == undefined)
      updationData.Quantity = previousData.Quantity;
    if (updationData.Variation == undefined)
      updationData.Variation = previousData.Variation;
    if (updationData.Discount == undefined)
      updationData.Discount = previousData.Discount;
    if (updationData.GrandTotal == undefined)
      updationData.GrandTotal = previousData.GrandTotal;
    if (updationData.SubTotal == undefined)
      updationData.SubTotal = previousData.SubTotal;
    if (updationData.TaxTotal == undefined)
      updationData.TaxTotal = previousData.TaxTotal;
    if (updationData.CreationDate == undefined)
      updationData.CreationDate = previousData.CreationDate;
    if (updationData.CartType == undefined)
      updationData.CartType = previousData.CartType;
  
    updationData = [
      updationData.Quantity,
      updationData.Variation,
      updationData.Discount,
      updationData.GrandTotal,
      updationData.SubTotal,
      updationData.TaxTotal,
      updationData.CreationDate,
      updationData.CartType,
    ];
    return updationData;
  }

module.exports = {getDataById, compareProductValues, compareVendorValues, compareCartValues};