const mysql = require("mysql2");
require("dotenv").config();

// Create connection pool (BEST for deployment)
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test connection
db.getConnection((err, connection) => {
  if (err) {
    console.log("DB connection failed:", err.message);
  } else {
    console.log("MySQL Connected Successfully");
    connection.release();
  }
});

module.exports = db;