const express = require("express");
const router = express.Router();
const { db } = require("../models/db");
const bcrypt = require("bcrypt");

// Middleware to check if admin is authenticated
function adminAuthMiddleware(req, res, next) {
  if (req.session.adminId) {
    next(); // Allow access if admin is authenticated
  } else {
    res.status(401).json({ message: "Unauthorized. Please log in." });
  }
}

// Admin login route
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM admins WHERE username = ?";
  db.query(query, [username], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Server error." });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Admin not found." });
    }

    const admin = results[0];
    const passwordIsValid = bcrypt.compareSync(password, admin.password);

    if (!passwordIsValid) {
      return res.status(401).json({ message: "Invalid password." });
    }

    req.session.adminId = admin.id; // Set admin ID in session
    res.status(200).json({ message: "Login successful" });
  });
});

// Admin logout route
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed." });
    }
    res.redirect("/admin-login.html"); // Redirect to admin login after logout
  });
});

// Fetch all schools (protected by adminAuthMiddleware)
router.get("/schools", adminAuthMiddleware, (req, res) => {
  const query = "SELECT id, school_name FROM schools";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Fetch a school's inventory (protected by adminAuthMiddleware)
router.get("/inventory/:school_name", adminAuthMiddleware, (req, res) => {
  const schoolName = req.params.school_name;

  const query = `
    SELECT p.id, p.name, p.description, p.image_path, si.quantity 
    FROM products p 
    JOIN submitted_inventory si 
    ON p.id = si.product_id 
    WHERE si.school_name = ? AND si.quantity > 0`;

  db.query(query, [schoolName], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

module.exports = router;
