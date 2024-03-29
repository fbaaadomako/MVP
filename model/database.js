require("dotenv").config();
const mysql = require("mysql2");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;
const DB_PORT = process.env.DB_PORT;

const con = mysql.createConnection({
  host: DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  password: DB_PASS,
  database: DB_NAME || "medications",
  multipleStatements: true,
  // port: process.env.DB_PORT || "3306"
  port: DB_PORT,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  let sql =
    "DROP TABLE if exists medications; CREATE TABLE medications(id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255), reason VARCHAR(255), frequency INT, dose VARCHAR(255), doctor VARCHAR(255), PRIMARY KEY (id));";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table creation `items` was successful!");

    console.log("Closing...");
  });

  con.end();
});
