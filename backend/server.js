const express = require("express");
const app = express();
const db = require("./db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

app.use(express.json());

// =======================
// JWT Middleware
// =======================
function verifyToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "Token required" });
  }

  try {
    const decoded = jwt.verify(token, "secretkey123");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

// =======================
// TEST ROUTE
// =======================
app.get("/", (req, res) => {
  res.send("Backend is working");
});

// =======================
// REGISTER
// =======================
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

    db.query(sql, [name, email, hashedPassword], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({
        message: "User registered successfully",
        userId: result.insertId
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// =======================
// LOGIN
// =======================
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = results[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      "secretkey123",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token
    });
  });
});

// =======================
// STUDENT APIs (PROTECTED)
// =======================

// ADD STUDENT
app.post("/student", verifyToken, (req, res) => {
  const { name, email, phone, course } = req.body;

  const sql =
    "INSERT INTO students (name, email, phone, course) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, email, phone, course], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    res.json({
      message: "Student added successfully",
      id: result.insertId
    });
  });
});

// GET STUDENTS
app.get("/students", verifyToken, (req, res) => {
  const sql = "SELECT * FROM students";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    res.json(results);
  });
});

// UPDATE STUDENT
app.put("/student/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  const { name, email, phone, course } = req.body;

  const sql =
    "UPDATE students SET name=?, email=?, phone=?, course=? WHERE id=?";

  db.query(sql, [name, email, phone, course, id], (err) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    res.json({ message: "Student updated successfully" });
  });
});

// DELETE STUDENT
app.delete("/student/:id", verifyToken, (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM students WHERE id=?";

  db.query(sql, [id], (err) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    res.json({ message: "Student deleted successfully" });
  });
});

// =======================
// START SERVER
// =======================
const PORT = 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});