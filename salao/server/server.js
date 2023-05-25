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
	password: "batata",
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
		} else if (type === "Serviços") {
			await db.query("DELETE FROM servico WHERE ser_codigo = ?", [code]);
		}
		res.send("Deletado com sucesso");
		return;
	} catch (error) {
		res.status(500).send(error);
	}

});

app.post("/pullService", async (req, res) => {
	try {
		const [rows] = await db.query("SELECT ser_nome, A.age_codigo FROM servico S, agenda A, agenda_servico ASV WHERE S.ser_codigo = ASV.ser_codigo AND A.age_codigo = ASV.age_codigo");

		res.send(rows);
		return;
	} catch (error) {
		res.status(500).send({ errorMessage: "Erro 500" });
	}
})

app.post("/pull", async (req, res) => {
	const type = req.body.type;
	const email = req.body.email;
	try {
		if (type === "Clientes") {
			const [rows] = await db.query("SELECT cli_codigo,cli_nome,cli_telefone FROM cliente C, usuario U WHERE C.usu_codigo = U.usu_codigo AND usu_email = ?", [email]);
			res.send(rows);
			return;
		} else if (type === "Agenda") {
			const [rows] = await db.query("SELECT A.age_codigo, C.cli_nome, TIME(A.age_horario)As age_horario, TIME(A.age_horarioTermino)As age_horarioTermino, DATE(A.age_horario)As age_date FROM agenda A, usuario U, cliente C WHERE A.usu_codigo = U.usu_codigo AND usu_email = ? AND A.cli_codigo = C.cli_codigo", [email]);

			const updatedRows = rows.map(row => {
				const date = row.age_date;
				row.age_date = date.toISOString().slice(0, 10);
				return row;
			});
			res.send(updatedRows);
			return;
		} else if (type === "Despesas") {
			const [rows] = await db.query("SELECT * FROM despesa WHERE usu_codigo = (SELECT usu_codigo FROM usuario WHERE usu_email = ?)", [email]);
			res.send(rows);
			return;
		} else if (type === "Produtos") {
			const [rows] = await db.query("SELECT pro_codigo,pro_nome,pro_preco,pro_quantidade,pro_descricao FROM produto P, usuario U WHERE P.usu_codigo = U.usu_codigo AND usu_email = ?", [email]);
			res.send(rows);
			return;
		} else if (type === "Serviços") {
			const [rows] = await db.query("SELECT ser_codigo,ser_nome,ser_preco,ser_descricao FROM servico S, usuario U WHERE S.usu_codigo = U.usu_codigo AND usu_email = ?", [email]);
			res.send(rows);
			return;
		}
	} catch (error) {
		res.status(500).send({ errorMessage: "Erro 500" });
	}
});

app.post("/register", async (req, res) => {
	const type = req.body.type;
	if (type === "user") {
		try {
			const name = req.body.name;
			const email = req.body.email;
			const password = req.body.password;
			const salonName = req.body.salonName;

			let [rows] = await db.query("SELECT * FROM usuario WHERE usu_email = ?", [email]);

			if (rows.length === 0) {
				bcrypt.hash(password, saltRounds, async (err, hash) => {
					await db.query("INSERT INTO usuario (usu_nome, usu_email, usu_senha, usu_nomeSalao) VALUES (?, ?, ?,?)", [name, email, hash, salonName]);
					res.send("Usuário cadastrado com sucesso");
					return;
				});
			} else {
				res.status(400).send({ errorMessage: "Usuário já cadastrado" })
				return;
			}
		} catch (error) {
			res.status(500).send(error);
		}
	} else if (type === "Clientes") {
		try {
			const values = req.body.values;
			const name = values.name;
			const fone = values.fone;
			const email = values.email;

			let [userCode] = await db.query("SELECT usu_codigo FROM usuario WHERE usu_email = ?", [email]);
			let [rows] = await db.query("SELECT * FROM cliente C, usuario U WHERE C.usu_codigo = U.usu_codigo && cli_nome = ? && usu_email = ?", [name, email]);
			if (rows.length === 0) {
				await db.query("INSERT INTO cliente (cli_nome, cli_telefone, usu_codigo) VALUES (?, ?, ?)", [name, fone, userCode[0].usu_codigo]);
				res.send(name + " cadastrado com sucesso");
				return;
			} else {
				res.status(400).send({ errorMessage: "Cliente Ja Cadastrado" });
				return;
			}
		} catch (error) {
			res.status(500).send({ errorMessage: "Erro 500" });
		}
	} else if (type === "Serviços") {
		try {
			const values = req.body.values;
			const nome = values.nome;
			const desc = values.desc;
			const price = values.price;
			const email = values.email;

			await db.query("INSERT INTO servico (ser_nome,ser_preco,ser_descricao,usu_codigo) VALUES (?, ?, ?, (SELECT usu_codigo FROM usuario WHERE usu_email = ?)) ", [nome, price, desc, email]);
			res.send("Cadastrado com sucesso");
			return;
		} catch (error) {
			res.status(500).send({ errorMessage: "Erro 500" });
		}
	} else if (type === "Produtos") {
		try {
			const values = req.body.values;
			const name = values.name;
			const price = values.price;
			const amount = values.amount;
			const desc = values.desc;
			const email = values.email;

			await db.query("INSERT INTO produto (pro_nome,pro_preco,pro_quantidade,pro_descricao,usu_codigo) VALUES (?, ?, ?, ?, (SELECT usu_codigo FROM usuario WHERE usu_email = ?))", [name, price, amount, desc, email]);
			res.send("Cadastrado com sucesso");
			return;
		} catch (error) {
			res.status(500).send({ errorMessage: "Erro 500" });
		}
	} else if (type === "Agenda") {
		try {
			const values = req.body.values;
			const date = values.date;
			const timeStart = values.timeStart;
			const timeEnd = values.timeEnd;
			const clientSelected = values.clientSelected;
			const servicesSelected = values.servicesSelected;
			const email = values.email;
			const dateTime = date + " " + timeStart + ":00";
			const dateTimeEnd = date + " " + timeEnd + ":00";

			let [rows] = await db.query("SELECT * FROM agenda WHERE ? >= NOW() AND ? < ?", [dateTime, dateTime, dateTimeEnd]);

			let [between] = await db.query("SELECT A.* FROM agenda A JOIN usuario U ON A.usu_codigo = U.usu_codigo AND usu_email = ? WHERE (? between age_horario AND age_horarioTermino) OR (? BETWEEN age_horario AND age_horarioTermino)", [email, dateTime, dateTimeEnd])

			if (rows.length !== 0 && between.length === 0) {
				await db.query("INSERT INTO agenda (age_horario,age_horarioTermino,usu_codigo,cli_codigo) VALUES (?, ?, (SELECT usu_codigo FROM usuario WHERE usu_email = ? LIMIT 1), (SELECT cli_codigo FROM cliente WHERE cli_nome = ? LIMIT 1))", [dateTime, dateTimeEnd, email, clientSelected])
				servicesSelected.forEach(async (service) =>
					await db.query("INSERT INTO agenda_servico (age_codigo, ser_codigo) VALUES ((SELECT age_codigo FROM agenda A, usuario U WHERE A.usu_codigo = U.usu_codigo and usu_email = ? ORDER BY age_codigo DESC LIMIT 1), (SELECT ser_codigo FROM servico WHERE ser_nome = ?))", [email, service]))
				res.send("Cadastrado com sucesso")
				return;
			} else {
				res.status(400).send({ errorMessage: "Selecione uma data valida" });
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