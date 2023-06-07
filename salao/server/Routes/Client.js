const { getClients, deleteClient, verifyClientEqual, registerClient, getUserCode } = require('../Query.js');

function AddClientRoutes(app) {
    app.post("/pull/Clientes", async (req, res) => {
        const email = req.body.email;
        try {
            const rows = await getClients(email);
            res.send(rows);
            return;
        }
        catch (error) {
            console.log(error);
            res.status(500).send({ errorMessage: "Erro 500" });
        }
    });

    app.post("/delete/Clientes", async (req, res) => {
        const code = req.body.rowCode;
        try {
            await deleteClient(code);
            res.send("Deletado com sucesso");
            return;
        }
        catch (error) {
            res.status(500).send({ errorMessage: "Não foi deletado com sucesso" });
        }
    });

    app.post("/register/Clientes", async (req, res) => {
        try {
            const values = req.body.values;
            const name = values.name;
            const fone = values.fone;
            const email = values.email;

            var userCode = await getUserCode(email);
            var IsEqual = await verifyClientEqual(name, email);
            if (!IsEqual) {
                await registerClient(name, fone, userCode);
                res.send(name + " cadastrado com sucesso");
                return;
            }
            else {
                res.status(400).send({ errorMessage: "Cliente Ja Cadastrado" });
                return;
            }

        }
        catch (error) {
            res.status(500).send({ errorMessage: "Erro 500" });
        }
    });

};

module.exports = { AddClientRoutes };