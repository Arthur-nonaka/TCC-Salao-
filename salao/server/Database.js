const mysql = require("mysql2/promise");

// const db = mysql.createPool({
//   host: "arthurnonaka.mysql.database.azure.com",
//   user: "batata",
//   password: "potato#123",
//   database: "beautyflowdata",
// });

const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "beautyflowdata",
});

module.exports = { db };
