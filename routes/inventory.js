const express = require("express");
const router = express.Router();
const { db, loadProductsFromCSV } = require("../models/db");
const path = require("path");

// Use db.query as before
router.get("/inventory", (req, res) => {
  const query = "SELECT * FROM products"; // Query to fetch all products

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching products:", err);
      res.status(500).send("Error fetching products");
    } else {
      res.json(results); // Send the products back to the client
    }
  });
});

// Load products from CSV into the database
router.get("/load-products", (req, res) => {
  loadProductsFromCSV(() => {
    res.send("Products loaded successfully.");
  });
});

// Inventory route to display the inventory page
router.get("/", (req, res) => {
  if (!req.session.schoolId) {
    return res.redirect("/auth/login");
  }
  res.sendFile(path.join(__dirname, "../public/inventory.html"));
});

// Fetch all products
router.get("/products", (req, res) => {
  const query = "SELECT * FROM products";
  db.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Insert or Update Inventory Function
const insertOrUpdateInventory = async (inventoryData, schoolName) => {
  try {
    for (let { id: product_id, quantity } of inventoryData) {
      await db.execute(
        `INSERT INTO submitted_inventory (school_name, product_id, quantity)
         VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE quantity = VALUES(quantity)`,
        [schoolName, product_id, quantity]
      );
    }
  } catch (error) {
    console.error("Error inserting or updating inventory:", error);
    throw error;
  }
};

// Submit Inventory Route
router.post("/submit-inventory", async (req, res) => {
  try {
    const inventoryData = req.body.inventory;
    const schoolName = req.session.schoolName; // Ensure session contains school name

    if (!schoolName) {
      return res.status(400).json({ message: "School not logged in." });
    }

    if (!inventoryData || inventoryData.length === 0) {
      return res.status(400).json({ message: "No inventory data provided." });
    }

    console.log("Received inventory data:", inventoryData);

    // Use the insertOrUpdateInventory function to handle inventory submissions
    await insertOrUpdateInventory(inventoryData, schoolName);

    res.status(200).json({ message: "Inventory submitted successfully." });
  } catch (error) {
    console.error("Error submitting inventory:", error);
    res.status(500).json({ message: "Failed to submit inventory." });
  }
});

// Fetch My Inventory Route
router.get("/my-inventory", (req, res) => {
  const schoolName = req.session.schoolName; // Get the school name from the session

  if (!schoolName) {
    return res.status(403).json({ message: "Not authorized" }); // Return unauthorized if school not found
  }

  const query =
    "SELECT p.id, p.name, p.description, p.image_path, si.quantity FROM products p JOIN submitted_inventory si ON p.id = si.product_id WHERE si.school_name = ? AND si.quantity > 0";

  db.query(query, [schoolName], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results); // Ensure this returns an array
  });
});

// Delete Product Route
router.delete("/my-inventory/:id", (req, res) => {
  const productId = req.params.id; // Get the product ID from the URL
  const schoolName = req.session.schoolName; // Get the school name from the session

  const query =
    "DELETE FROM submitted_inventory WHERE product_id = ? AND school_name = ?";

  db.query(query, [productId, schoolName], (err, results) => {
    if (err) {
      console.error("Error deleting product:", err);
      return res.status(500).json({ message: "Failed to delete product" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  });
});

module.exports = router;
