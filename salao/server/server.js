const express = require("express");
const cors = require("cors");
//const mysql = require("mysql");
const mysql = require('mysql2/promise');
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createPool(({
	host: "127.0.0.1",
	user: "root",
	password: "",
	database: "beautyflowdata",
}));

app.post("/register", async (req, res) => {
	try {
		const name = req.body.name;
		const email = req.body.email;
		const password = req.body.password;

		let [rows, fields] = await db.query("SELECT * FROM usuario WHERE usu_email = ?", [email]);

		console.log(rows);
		if (rows.length == 0) {
			let result = await db.query("INSERT INTO usuario (usu_nome, usu_email, usu_senha) VALUES (?, ?, ?)", [name, email, password]);
			res.send("Usuário cadastrado com sucesso");
			return;
		} else {
			res.status(400).send({ errorMessage: "Usuário já cadastrado" })
			return;
		}
	} catch (error) {
		res.status(500).send(error);
	}
});

app.post("/login", async (req, res) => {
	try {
		const email = req.body.email;
		const password = req.body.password;

		let [rows, fields] = await db.query("SELECT * FROM usuario WHERE  usu_email = ? AND usu_senha = ?", [email, password]);
		if (rows.length > 0) {
			res.send({ msg: "Usuário Logado" })
		} else {
			res.status(400).send({ errorMessage: "Email ou Senha Invalido" })
		}

	} catch (error) {
		res.status(500).send(error);
	}
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