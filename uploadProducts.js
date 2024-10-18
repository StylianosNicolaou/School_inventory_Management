const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

// MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root", // replace with your MySQL username
  password: "Styl27072001", // replace with your MySQL password
  database: "inventory", // replace with your database name
});

// Path to the CSV file
const csvFilePath = path.join(__dirname, "products_with_images.csv"); // Update the path to your CSV file here

// Function to upload products from CSV
const uploadProducts = () => {
  const products = [];

  // Read the CSV file
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", (row) => {
      // Assuming your CSV has the columns: id, name, description, image_path
      const product = {
        id: row.id,
        name: row.name,
        description: row.description,
        image_path: row.image_path, // Keep the correct field name here
      };
      products.push(product);
    })
    .on("end", () => {
      // Insert products into the database
      products.forEach((product) => {
        const sql =
          "INSERT INTO products (id, name, description, image_path) VALUES (?, ?, ?, ?)"; // Ensure correct column name is used
        const values = [
          product.id,
          product.name,
          product.description,
          product.image_path, // Use 'image_path' to match the object
        ];

        connection.query(sql, values, (err, results) => {
          if (err) {
            console.error(
              `Error inserting product ID: ${product.id}. Error: ${err.message}`
            );
          } else {
            console.log(`Inserted product ID: ${product.id}`);
          }
        });
      });

      // Close the MySQL connection
      connection.end();
    })
    .on("error", (error) => {
      console.error(`Error reading CSV file: ${error.message}`);
    });
};

// Start the upload process
uploadProducts();
