const mysql = require("mysql2/promise");

// const db = mysql.createPool({
//   host: "arthurnonaka.mysql.database.azure.com",
//   user: "batata",
//   password: "secretPassword!123",
//   database: "beautyflowdata",
// });

const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "batata",
  database: "beautyflowdata",
});

module.exports = { db };
