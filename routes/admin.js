const express = require("express");
const router = express.Router();
const db = require("../models/db");

// Fetch all schools
router.get("/schools", (req, res) => {
  const query = "SELECT * FROM schools";
  db.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Fetch inventory for a specific school
router.get("/school/:id/inventory", (req, res) => {
  const query = "SELECT * FROM products WHERE school_id = ? AND quantity > 0";
  db.query(query, [req.params.id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

module.exports = router;
