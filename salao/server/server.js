const express = require("express");
const cors = require("cors");
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

app.post('/delete', async (req, res) => {
	const type = req.body.type;
	const code = req.body.rowCode;
	try {
		if (type === "Clientes") {
			let result = await db.query("DELETE FROM cliente WHERE cli_codigo = ?", [code]);
		} else if (type === "Agenda") {
			let result = await db.query("DELETE FROM agenda WHERE age_codigo = ?", [code]);
		} else if (type === "Despesas") {
			let result = await db.query("DELETE FROM despesa WHERE des_codigo = ?", [code]);
		} else if (type === "Produtos") {
			let result = await db.query("DELETE FROM produto WHERE pro_codigo = ?", [code]);
		} else if (type === "Servicos") {
			let result = await db.query("DELETE FROM servico WHERE ser_codigo = ?", [code]);
		}
		res.send("Deletado com sucesso");
	} catch (error) {
		res.status(500).send(error);
	}

});

app.post("/pull", async (req, res) => {
	const type = req.body.type;
	const email = req.body.email;
	try {
		if (type === "Clientes") {
			var [rows, fields] = await db.query("SELECT cli_nome, cli_telefone, cli_codigo FROM cliente WHERE usu_codigo = (SELECT usu_codigo FROM usuario WHERE usu_email = ?)", [email]);
		} else if (type === "Agenda") {
			var [rows, fields] = await db.query("SELECT * FROM agenda WHERE usu_codigo = (SELECT usu_codigo FROM usuario WHERE usu_email = ?)", [email]);
		} else if (type === "Despesas") {
			var [rows, fields] = await db.query("SELECT * FROM despesa WHERE usu_codigo = (SELECT usu_codigo FROM usuario WHERE usu_email = ?)", [email]);
		} else if (type === "Produtos") {
			var [rows, fields] = await db.query("SELECT * FROM produto WHERE usu_codigo = (SELECT usu_codigo FROM usuario WHERE usu_email = ?)", [email]);
		} else if (type === "Servicos") {
			var [rows, fields] = await db.query("SELECT * FROM servico WHERE usu_codigo = (SELECT usu_codigo FROM usuario WHERE usu_email = ?)", [email]);
		}
		res.send(rows);
	} catch (error) {
		res.status(500).send(error);
	}
});

app.post("/register", async (req, res) => {
	const type = req.body.type;
	if (type === "user") {
		try {
			const name = req.body.name;
			const email = req.body.email;
			const password = req.body.password;

			let [rows, fields] = await db.query("SELECT * FROM usuario WHERE usu_email = ?", [email]);

			if (rows.length === 0) {
				let result = await db.query("INSERT INTO usuario (usu_nome, usu_email, usu_senha) VALUES (?, ?, ?)", [name, email, password]);
				res.send("Usuário cadastrado com sucesso");
				return;
			} else {
				res.status(400).send({ errorMessage: "Usuário já cadastrado" })
				return;
			}
		} catch (error) {
			console.log(error);
			res.status(500).send(error);
		}
	} else if (type === "Clientes") {
		try {
			const test = req.body.values;
			const name = test.name;
			const fone = test.fone;
			const email = test.email;

			let [rows] = await db.query("SELECT * FROM cliente WHERE cli_nome = ?", [name]);
			let [userCode] = await db.query("SELECT usu_codigo FROM usuario WHERE usu_email = ?", [email]);
			if (rows.length === 0) {
				let insert = await db.query("INSERT INTO cliente (cli_nome, cli_telefone, usu_codigo) VALUES (?, ?, ?)", [name, fone, userCode[0].usu_codigo]);
				res.send("Cliente cadastrado com sucesso");
				return;
			} else {
				res.status(400).send({ errorMessage: "Cliente Ja Cadastrado" });
				return;
			}
		} catch (error) {
			console.log(error);
			res.status(500).send(error);
		}
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