const express = require("express");
const router = express.Router();
const { db } = require("../models/db");
const bcrypt = require("bcrypt");
const path = require("path");

// Serve login page
router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Registration route
router.post("/register", async (req, res) => {
  const { school_name, email, password } = req.body;

  // Hash password
  const hashedPassword = bcrypt.hashSync(password, 10); // 10 is the salt rounds

  // Insert school into the database
  const query =
    "INSERT INTO schools (school_name, email, password) VALUES (?, ?, ?)";

  db.query(query, [school_name, email, hashedPassword], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ message: "Server error." });
    }
    res.status(200).json({ message: "School registered successfully." });
  });
});

// POST route for login
router.post("/login", (req, res) => {
  const { school_name, password } = req.body;

  // Query the school from the database
  const query = "SELECT * FROM schools WHERE school_name = ?";
  db.query(query, [school_name], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Server error." });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "School not found." });
    }

    const school = results[0];

    // Check if the password is correct (compare it with hashed password)
    const passwordIsValid = bcrypt.compareSync(password, school.password); // Or use bcrypt.compare

    if (!passwordIsValid) {
      return res.status(401).json({ message: "Invalid password." });
    }

    // Save school info in session
    req.session.schoolId = school.id;
    req.session.schoolName = school.school_name;

    res.status(200).json({ message: "Login successful" });
  });
});

// Handle logout
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed." });
    }
    res.redirect("/auth/login"); // Redirect to the login page after logging out
  });
});

module.exports = router;
