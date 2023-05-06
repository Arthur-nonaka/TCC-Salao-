const express = require("express");
const cors = require("cors");
const mysql = require('mysql2/promise');
const bcrypt = require("bcrypt");
const app = express();

const saltRounds = 10;

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
			await db.query("DELETE FROM cliente WHERE cli_codigo = ?", [code]);
		} else if (type === "Agenda") {
			await db.query("DELETE FROM agenda WHERE age_codigo = ?", [code]);
		} else if (type === "Despesas") {
			await db.query("DELETE FROM despesa WHERE des_codigo = ?", [code]);
		} else if (type === "Produtos") {
			await db.query("DELETE FROM produto WHERE pro_codigo = ?", [code]);
		} else if (type === "Servicos") {
			await db.query("DELETE FROM servico WHERE ser_codigo = ?", [code]);
		}
		res.send("Deletado com sucesso");
		return;
	} catch (error) {
		res.status(500).send(error);
	}

});

app.post("/pull", async (req, res) => {
	const type = req.body.type;
	const email = req.body.email;
	try {
		if (type === "Clientes") {
			const [rows] = await db.query("SELECT cli_nome, cli_telefone, cli_codigo FROM cliente WHERE usu_codigo = (SELECT usu_codigo FROM usuario WHERE usu_email = ?)", [email]);
			res.send(rows);
			return;
		} else if (type === "Agenda") {
			const [rows] = await db.query("SELECT * FROM agenda WHERE usu_codigo = (SELECT usu_codigo FROM usuario WHERE usu_email = ?)", [email]);
			res.send(rows);
			return;
		} else if (type === "Despesas") {
			const [rows] = await db.query("SELECT * FROM despesa WHERE usu_codigo = (SELECT usu_codigo FROM usuario WHERE usu_email = ?)", [email]);
			res.send(rows);
			return;
		} else if (type === "Produtos") {
			const [rows] = await db.query("SELECT * FROM produto WHERE usu_codigo = (SELECT usu_codigo FROM usuario WHERE usu_email = ?)", [email]);
			res.send(rows);
			return;
		} else if (type === "Servicos") {
			const [rows] = await db.query("SELECT * FROM servico WHERE usu_codigo = (SELECT usu_codigo FROM usuario WHERE usu_email = ?)", [email]);
			res.send(rows);
			return;
		}
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

			let [rows] = await db.query("SELECT * FROM usuario WHERE usu_email = ?", [email]);
			
			if (rows.length === 0) {
				bcrypt.hash(password, saltRounds, async (err, hash) => {
					await db.query("INSERT INTO usuario (usu_nome, usu_email, usu_senha) VALUES (?, ?, ?)", [name, email, hash]);
					res.send("Usuário cadastrado com sucesso");
					return;
				});
			} else {
				res.status(400).send({ errorMessage: "Usuário já cadastrado" })
				return;
			}
		} catch (error) {
			//console.log(error);
			res.status(500).send(error);
		}
	} else if (type === "Clientes") {
		try {
			const test = req.body.values;
			const name = test.name;
			const fone = test.fone;
			const email = test.email;

			let [userCode] = await db.query("SELECT usu_codigo FROM usuario WHERE usu_email = ?", [email]);
			let [rows] = await db.query("SELECT * FROM cliente WHERE cli_nome = ? && usu_codigo = ?", [name, userCode[0].usu_codigo]);
			if (rows.length === 0) {
				await db.query("INSERT INTO cliente (cli_nome, cli_telefone, usu_codigo) VALUES (?, ?, ?)", [name, fone, userCode[0].usu_codigo]);
				res.send(name +" cadastrado com sucesso");
				return;
			} else {
				res.status(400).send({ errorMessage: "Cliente Ja Cadastrado" });
				return;
			}
		} catch (error) {
			res.status(500).send({ errorMessage: "Erro 500" });
		}
	}
});

app.post("/login", async (req, res) => {
	try {
		const email = req.body.email;
		const password = req.body.password;
		let [cryptPassword] = await db.query("SELECT usu_senha FROM usuario WHERE usu_email = ?", [email]);
		const result = bcrypt.compareSync(password, cryptPassword[0].usu_senha)
		console.log(result);
		if (result) {
			res.send({ msg: "Usuário Logado" })
		} else {
			res.status(400).send({ errorMessage: "Email ou Senha Invalido" })
		};
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