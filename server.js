// require("dotenv").config();
// const express = require("express");
// const session = require("express-session");
// const bodyParser = require("body-parser");
// const { db } = require("./models/db"); // Make sure this file exports a MySQL connection
// const authRoutes = require("./routes/auth");
// const inventoryRoutes = require("./routes/inventory");
// const adminRoutes = require("./routes/admin");
// const path = require("path");

// const app = express();
// const PORT = process.env.PORT || 5006;

// // Body parser middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Session configuration
// app.use(
//   session({
//     secret: "Styl27072001",
//     resave: false,
//     saveUninitialized: false,
//     cookie: { secure: false }, // Set to true if using HTTPS
//   })
// );

// // Auth routes
// app.use("/auth", authRoutes);

// // Inventory routes
// app.use("/inventory", inventoryRoutes);

// // Protect access to /protected/admin.html by checking admin authentication
// app.use("/protected", (req, res, next) => {
//   if (!req.session.adminId) {
//     return res.redirect("/admin-login.html"); // Redirect to admin login if not logged in
//   }
//   next(); // Continue to the admin page if logged in
// });

// // Serve protected files ONLY after checking if the user is logged in as admin
// app.use("/protected", express.static(path.join(__dirname, "protected")));

// // Serve public static files (always accessible)
// app.use(express.static(path.join(__dirname, "public")));

// // Admin routes
// app.use("/admin", adminRoutes);

// // Serve HTML pages
// app.get("/login", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "login.html"));
// });

// app.get("/register", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "register.html"));
// });

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// // Fetch submitted products for the current school
// app.get("/api/my-inventory", (req, res) => {
//   const schoolId = req.session.schoolId; // Get the current school ID from session
//   db.query(
//     "SELECT p.id, p.name, p.description, p.image_path, si.quantity FROM products p JOIN submitted_inventory si ON p.id = si.product_id WHERE si.quantity > 0 AND si.school_id = ?",
//     [schoolId],
//     (err, results) => {
//       if (err) return res.status(500).json({ error: err.message });
//       res.json(results);
//     }
//   );
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

require("dotenv").config();
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const { db } = require("./models/db"); // Ensure db.js exports a MySQL connection using these env variables
const authRoutes = require("./routes/auth");
const inventoryRoutes = require("./routes/inventory");
const adminRoutes = require("./routes/admin");

const app = express();
const PORT = process.env.PORT || 5006;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS for the Vercel domain
app.use(
  cors({
    credentials: true, // Allow session cookies to be sent
  })
);

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "AVNS_ewFwe9d5gQz3SGmNn_6",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // Only secure cookies in production
      sameSite: "lax", // Helps with CORS and secure handling
    },
  })
);

// Serve public and protected directories
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/protected",
  (req, res, next) => {
    if (!req.session.adminId) {
      return res.redirect("/admin-login.html");
    }
    next();
  },
  express.static(path.join(__dirname, "protected"))
);

// Auth routes
app.use("/auth", authRoutes);

// Inventory routes
app.use("/inventory", inventoryRoutes);

// Admin routes
app.use("/admin", adminRoutes);

// Serve HTML pages
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "register.html"));
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Fetch submitted products for the current school
app.get("/api/my-inventory", (req, res) => {
  const schoolId = req.session.schoolId; // Get the current school ID from session
  db.query(
    "SELECT p.id, p.name, p.description, p.image_path, si.quantity FROM products p JOIN submitted_inventory si ON p.id = si.product_id WHERE si.quantity > 0 AND si.school_id = ?",
    [schoolId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
