const { getSaleInfo, registerSale, getUserCode, getSale, getSaleMethod} = require("../Query.js");

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
      await registerSale(userCode, clientName, services, totalPrice, selectedValue, scheduleCode);
      res.send("Venda realizada com sucesso!");
      return;
    } catch (error){
      console.log(error);
      res.status(500).send({ errorMessage: "Erro 500" });
    }
  });

  app.post("/pull/Venda", async (req,res) => {
    const email = req.body.email;
    try {
      const rows = await getSale(email);
      res.send(rows);
      return;
    }
    catch (error) {
      console.log(error);
      res.status(500).send({ errorMessage: "Erro 500" });
    }
  });

  app.post("/pull/VendaMetodo", async (req,res) => {
    const email = req.body.email;
    try {
      const rows = await getSaleMethod(email);
      res.send(rows);
      return;
    }
    catch (error) {
      console.log(error);
      res.status(500).send({ errorMessage: "Erro 500" });
    }
  });
}

module.exports = { AddSaleRoutes };
