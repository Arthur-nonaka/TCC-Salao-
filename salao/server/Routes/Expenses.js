const {
  getExpenses,
  deleteExpense,
  registerExpense,
  editExpense,
} = require("../Query.js");

function AddExpensesRoutes(app) {
  app.post("/pull/Despesas", async (req, res) => {
    const email = req.body.email;
    try {
      const rows = await getExpenses(email);
      res.send(rows);
      return;
    } catch (error) {
      console.log(error);
      res.status(500).send({ errorMessage: "Erro 500" });
    }
  });

  app.post("/delete/Despesas", async (req, res) => {
    const code = req.body.rowCode;
    try {
      await deleteExpense(code);
      res.send("Deletado com sucesso");
      return;
    } catch (error) {
      res.status(500).send({ errorMessage: "Não foi deletado com sucesso" });
    }
  });

  app.post("/edit/Despesas", async (req, res) => {
    const code = req.body.rowCode;
    const values = req.body.editValues;

    try {
      await editExpense(values[0], values[1], values[2], code);
      res.send("Editado com sucesso");
      return;
    } catch (error) {
      res.status(500).send({ errorMessage: "Não foi Editado com sucesso" });
    }
  });

  app.post("/register/Despesas", async (req, res) => {
    try {
      const values = req.body.values;
      const desc = values.desc;
      const price = values.price;
      const date = values.date;
      const email = values.email;

      await registerExpense(desc, price, date, email);
      res.send("Cadastrado com sucesso");
    } catch (error) {
      res.status(500).send({ errorMessage: "Erro 500" });
    }
  });
}

module.exports = { AddExpensesRoutes };
