// createAdmin.js
const bcrypt = require("bcryptjs");
const { db } = require("./db"); // Reusing the db connection from db.js

const saltRounds = 10;
const adminUsername = "Admin"; // Set your admin username here
const adminPassword = "Leonidas300"; // Set your admin password here

// Hash the password
bcrypt.hash(adminPassword, saltRounds, (err, hash) => {
  if (err) throw err;

  // Insert the admin user with username and hashed password
  const query = "INSERT INTO admins (username, password) VALUES (?, ?)";
  db.query(query, [adminUsername, hash], (err, result) => {
    if (err) {
      console.error("Error inserting admin:", err);
    } else {
      console.log("Admin user created successfully.");
    }
    db.end(); // Close the database connection
  });
});
