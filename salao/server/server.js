const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createPool(({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "beautyflowdata",
}));

app.post("/register", (req, res) => {
  const name = app.body.name;
  const email = app.body.email;
  const password = app.body.password;

  db.query("SELECT * FROM usuario WHERE usu_email = ?" [email], 
  (req, result) => {
    if(err){
      res.send(err);
    }
    if(result.lenght == 0){
      db.query("INSERT INTO usuario (usu,nome, usu_email, usu_senha) VALUES (?, ?, ?)", [name, email, password],
      (err, result) => {
        if (err) {
          res.send(err);
        }
        res.send("Usuário cadastrado com sucesso");
      }
      );
    } else {
      res.send({ msg: "Usuário já cadastrado" })
    }
    res.send(res);
  });
});

app.post("/login", (req, res) => {
  const name = app.body.name;
  const email = app.body.email;
  const password = app.body.password;

  db("SELECT * FROM usuario WHERE  usu_email = ? AND usu_senha = ?", [email, password], 
  (err, result) => {
    if(err){
      res.send(err);
    }
    if(result.lenght > 0){
      res.send({ msg: "Usuário Logado" })
    } else {
      res.send({ msg: "Usuário não encontrado" })
    }
  })
})

// app.get("/", (req, res) => {
//   db.getConnection((err, connection) => {
//     if (err) {
//       res.send(err);
//       return;
//     }
//     res.send("batata");
//     connection.query("INSERT INTO usuario (usu_email, usu_senha) VALUES ('pedrooliveiramuraro@gmail.com', '123456')");
//   });

//  db.query("INSERT INTO usuario (usu_email, usu_senha) VALUES ('pedrooliveiramuraro@gmail.com', '123456')")
// });

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});