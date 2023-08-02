const {
  getSaleInfo,
  registerSale,
  getUserCode,
  getSale,
  getSaleMethod,
  getSaleQuantity,
  getSaleServices,
  getSaleYearMonth
} = require("../Query.js");

function AddSaleRoutes(app) {
  app.post("/pull/VendaInfo", async (req, res) => {
    const schedule = req.body.schedule;
    try {
      const row = await getSaleInfo(schedule);
      res.send();
      return;
    } catch (error) {
      console.log(error);
      res.status(500).send({ errorMessage: "Erro 500" });
    }
  });

  app.post("/register/Venda", async (req, res) => {
    const email = req.body.email;
    const schedule = req.body.schedule;
    const scheduleCode = schedule.age_codigo;
    const clientName = schedule.cli_nome;
    const services = req.body.services;
    const totalPrice = req.body.totalPrice;
    const selectedValue = req.body.selectedValue;
    try {
      const userCode = await getUserCode(email);
      await registerSale(
        userCode,
        clientName,
        services,
        totalPrice,
        selectedValue,
        scheduleCode
      );
      res.send("Venda realizada com sucesso!");
      return;
    } catch (error) {
      console.log(error);
      res.status(500).send({ errorMessage: "Erro 500" });
    }
  });

  app.post("/pull/Venda", async (req, res) => {
    const email = req.body.email;
    try {
      const rows = await getSale(email);
      res.send(rows);
      return;
    } catch (error) {
      console.log(error);
      res.status(500).send({ errorMessage: "Erro 500" });
    }
  });

  app.post("/pull/VendaMetodo", async (req, res) => {
    const email = req.body.email;
    try {
      const rows = await getSaleMethod(email);
      res.send(rows);
      return;
    } catch (error) {
      console.log(error);
      res.status(500).send({ errorMessage: "Erro 500" });
    }
  });

  app.post("/pull/VendaServicos", async (req, res) => {
    const email = req.body.email;
    const year = req.body.year;
    const month = req.body.month;
    try {
      const codes = await getSaleYearMonth(email, year, month);
      let rows = [];
      if(codes.length !== 0) {
        rows = await getSaleServices(codes);
      }
      res.send(rows);
      return;
    } catch (error) {
      console.log(error);
      res.status(500).send({ errorMessage: "Erro 500" });
    }
  });

  app.post("/pull/VendaQuantidade", async (req, res) => {
    const email = req.body.email;
    const year = req.body.year;
    try {
      const rows = await getSaleQuantity(email, year);
      let value = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      rows.forEach((row) => {
        value[row.month - 1] = row.total_amount;
      });
      series = [
        {
          name: "vendas",
          data: value,
        },
      ];
      res.send(series);
      return;
    } catch (error) {
      console.log(error);
      res.status(500).send({ errorMessage: "Erro 500" });
    }
  });
}

module.exports = { AddSaleRoutes };
