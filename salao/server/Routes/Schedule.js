const {
  getSchedule,
  getScheduleAccordion,
  deleteSchedule,
  registerSchedule,
  verifyScheduleTime,
  verifyScheduleEqual,
} = require("../Query.js");

function AddScheduleRoutes(app) {
  app.post("/pull/Agenda", async (req, res) => {
    const email = req.body.email;
    try {
      const rows = await getSchedule(email);
      res.send(rows);
      return;
    } catch (error) {
      console.log(error);
      res.status(500).send({ errorMessage: "Erro 500" });
    }
  });

  app.post("/pullAccordion/Agenda", async (req, res) => {
    const schedule = req.body.schedule;
    const rowCode = schedule.age_codigo;
    try {
      const rows = await getScheduleAccordion(rowCode);
      res.send(rows);
      return;
    } catch (error) {
      res.status(500).send({ errorMessage: "Erro 500" });
    }
  });

  app.post("/delete/Agenda", async (req, res) => {
    const code = req.body.rowCode;
    try {
      await deleteSchedule(code);
      res.send("Deletado com sucesso");
      return;
    } catch (error) {
      res.status(500).send({ errorMessage: "Não foi deletado com sucesso" });
    }
  });

  app.post("/register/Agenda", async (req, res) => {
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
      const isPossible = await verifyScheduleTime(dateTime, dateTimeEnd);

      const between = await verifyScheduleEqual(dateTime, dateTimeEnd, email);
      let a = "";
      if (between.length !== 0) {
        let names = between.map((x) => {
          return x.cli_nome;
        });
        a = "! Mesmo Horario: " + names + " ! ";
      }
      if (isPossible) {
        await registerSchedule(
          dateTime,
          dateTimeEnd,
          email,
          clientSelected,
          servicesSelected
        );
        res.send("Cadastrado com sucesso" + a);
        return;
      } else {
        res.status(400).send({ errorMessage: "Selecione uma data valida" });
        return;
      }
    } catch (error) {
      res.status(500).send({ errorMessage: "Erro 500" });
    }
  });
}

module.exports = { AddScheduleRoutes };
