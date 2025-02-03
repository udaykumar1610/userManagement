const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql
  .createPool({
    host: "localhost",
    user: "root",
    password: "Uday@k123",
    database: "usermanagement",
  })
  .promise();

pool
  .getConnection()
  .then((connection) => {
    console.log("✅ MySQL Connected Successfully!");
    connection.release();
  })
  .catch((err) => {
    console.error("❌ MySQL Connection Failed:", err.message);
  });

module.exports = pool;
