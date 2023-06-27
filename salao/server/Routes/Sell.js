const {getSellInfo} = require("../Query.js");

function AddSellRoutes(app) {
  app.post("/pull/VendaInfo", async (req, res) => {
    const schedule = req.body.schedule;
    try {
        const row = await getSellInfo(schedule);
        res.send();
        return;
    } catch (error) {
      console.log(error);
      res.status(500).send({ errorMessage: "Erro 500" });
    }
  });
}

module.exports = { AddSellRoutes };
