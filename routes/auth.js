// const express = require("express");
// const router = express.Router();
// const { db } = require("../models/db");
// const bcrypt = require("bcryptjs");
// const path = require("path");

// // Serve login page
// router.get("/login", (req, res) => {
//   res.sendFile(path.join(__dirname, "../public/index.html"));
// });
// // Route to get the logged-in school info
// router.get("/get-school-info", (req, res) => {
//   if (req.session.schoolName) {
//     res.json({ schoolName: req.session.schoolName });
//   } else {
//     res.status(401).json({ message: "Not logged in" });
//   }
// });

// // Registration route
// router.post("/register", async (req, res) => {
//   const { school_name, email, password } = req.body;

//   // Hash the password
//   const hashedPassword = bcrypt.hashSync(password, 10); // 10 is the salt rounds

//   // Insert school into the database
//   const query =
//     "INSERT INTO schools (school_name, email, password) VALUES (?, ?, ?)";
//   db.query(query, [school_name, email, hashedPassword], (err, results) => {
//     if (err) {
//       console.error("Error executing query:", err);
//       return res.status(500).json({ message: "Server error." });
//     }

//     // Log in the user by saving the session
//     req.session.schoolId = results.insertId; // Set the school's unique ID
//     req.session.schoolName = school_name; // Set the school's name

//     // Respond with success and the session info
//     res
//       .status(200)
//       .json({ message: "School registered and logged in successfully." });
//   });
// });

// // POST route for login
// router.post("/login", (req, res) => {
//   const { school_name, password } = req.body;

//   // Query the school from the database
//   const query = "SELECT * FROM schools WHERE school_name = ?";
//   db.query(query, [school_name], (err, results) => {
//     if (err) {
//       return res.status(500).json({ message: "Server error." });
//     }

//     if (results.length === 0) {
//       return res.status(401).json({ message: "School not found." });
//     }

//     const school = results[0];

//     // Check if the password is correct (compare it with hashed password)
//     const passwordIsValid = bcrypt.compareSync(password, school.password); // Or use bcrypt.compare

//     if (!passwordIsValid) {
//       return res.status(401).json({ message: "Invalid password." });
//     }

//     // Save school info in session
//     req.session.schoolId = school.id;
//     req.session.schoolName = school.school_name;

//     res.status(200).json({ message: "Login successful" });
//   });
// });

// // Handle logout
// router.get("/logout", (req, res) => {
//   req.session.destroy((err) => {
//     if (err) {
//       return res.status(500).json({ message: "Logout failed." });
//     }
//     res.redirect("/auth/login"); // Redirect to the login page after logging out
//   });
// });

// module.exports = router;

// V2
const express = require("express");
const router = express.Router();
const { db } = require("../models/db");

// Register route
router.post("/register", (req, res) => {
  const { school_name, email, password } = req.body;

  if (!school_name || !email || !password) {
    console.error("Missing fields in registration data.");
    return res.status(400).json({ message: "All fields are required." });
  }

  const query =
    "INSERT INTO schools (school_name, email, password) VALUES (?, ?, ?)";

  db.query(query, [school_name, email, password], (err, results) => {
    if (err) {
      console.error("Database error during registration:", err);
      return res
        .status(500)
        .json({ message: "Registration failed due to a database error." });
    }

    // Make sure req.session exists before using it
    if (req.session) {
      req.session.schoolName = school_name;
      console.log("Session set for school:", school_name);
    }

    res
      .status(200)
      .json({ message: "School registered and logged in successfully." });
  });
});

// Login route
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  // Implement your login logic here
});

module.exports = router;
