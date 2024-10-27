// db.js
const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser"); // Ensure this package is installed
require("dotenv").config();

// Create the MySQL connection
// const db = mysql.createConnection({
//   host: process.env.DB_HOST || "localhost",
//   user: process.env.DB_USER || "root",
//   password: process.env.DB_PASS || "Styl27072001",
//   database: process.env.DB_NAME || "inventory",
// });
const db = mysql.createConnection({
  host:
    process.env.DB_HOST || "school-inventory-school-inventory.c.aivencloud.com",
  user: process.env.DB_USER || "avnadmin",
  password: process.env.DB_PASS || "AVNS_ewFwe9d5gQz3SGmNn_6",
  database: process.env.DB_NAME || "defaultdb",
  port: process.env.DB_PORT || 15169, // Use Aiven's specific port if needed
  connectTimeout: 20000, // Set a 20-second timeout
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
    return;
  }
  console.log("Connected to the MySQL database.");
});

// Function to load products from CSV and insert into the database
function loadProductsFromCSV(callback) {
  const products = [];
  fs.createReadStream(path.join(__dirname, "../products_with_images.csv")) // Adjust the path here
    .pipe(csv())
    .on("data", (row) => {
      products.push(row);
    })
    .on("end", () => {
      const insertQueries = products.map((product) => {
        return new Promise((resolve, reject) => {
          const query =
            "INSERT INTO products (id, name, description, image) VALUES (?, ?, ?, ?)";
          db.query(
            query,
            [
              product.id, // Ensure you have the correct column for id from your CSV
              product.name,
              product.description,
              product.image,
            ],
            (err) => {
              if (err) return reject(err);
              resolve();
            }
          );
        });
      });

      // Execute all insert queries
      Promise.all(insertQueries)
        .then(() => {
          console.log("Products loaded into the database.");
          callback(products);
        })
        .catch((err) => {
          console.error("Error inserting products:", err);
        });
    });
}

// Export both the db connection and the CSV loading function properly
module.exports = {
  db,
  loadProductsFromCSV,
};
