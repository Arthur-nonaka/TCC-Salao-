const {
  getServices,
  deleteService,
  registerService,
  getServiceAccordion,
  editExpense,
} = require("../Query.js");

function AddServiceRoutes(app) {
  app.post("/pull/Servicos", async (req, res) => {
    const email = req.body.email;
    try {
      const rows = await getServices(email);
      res.send(rows);
      return;
    } catch (error) {
      console.log(error);
      res.status(500).send({ errorMessage: "Erro 500" });
    }
  });

  app.post("/pullAccordion/Servicos", async (req, res) => {
    const rowCode = req.body.rowCode;
    try {
      const rows = await getServiceAccordion(rowCode);
      res.send(rows);
      return;
    } catch (error) {
      res.status(500).send({ errorMessage: "Erro 500" });
    }
  });

  app.post("/delete/Servicos", async (req, res) => {
    const code = req.body.rowCode;
    try {
      await deleteService(code);
      res.send("Deletado com sucesso");
      return;
    } catch (error) {
      res.status(500).send({ errorMessage: "Não foi deletado com sucesso" });
    }
  });

  app.post("/edit/Servicos", async (req, res) => {
    const code = req.body.rowCode;
    const values = req.body.editValues;

    try {
      await editExpense(values[0], values[1], code);
      res.send("Editado com sucesso");
      return;
    } catch (error) {
      res.status(500).send({ errorMessage: "Não foi Editado com sucesso" });
    }
  });

  app.post("/register/Servicos", async (req, res) => {
    try {
      const values = req.body.values;
      const nome = values.nome;
      const desc = values.desc;
      const price = values.price;
      const email = values.email;

      await registerService(nome, price, desc, email);
      res.send(nome + " cadastrado com sucesso");
    } catch (error) {
      res.status(500).send({ errorMessage: "Erro 500" });
    }
  });
}

module.exports = { AddServiceRoutes };
