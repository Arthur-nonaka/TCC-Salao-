const { getProducts, getProductAccordion, deleteProduct, registerProduct } = require('../Query.js');

function AddProductRoutes(app) {
    app.post("/pull/Produtos", async (req, res) => {
        const email = req.body.email;
        try {
            const rows = await getProducts(email);
            res.send(rows);
            return;
        }
        catch (error) {
            console.log(error);
            res.status(500).send({ errorMessage: "Erro 500" });
        }
    });

    app.post("/pullAccordion/Produtos", async (req, res) => {
        const rowCode = req.body.rowCode;
        try {
            const rows = await getProductAccordion(rowCode);
            res.send(rows);
            return;
        }
        catch (error) {
            res.status(500).send({ errorMessage: "Erro 500" });
        }
    });

    app.post("/delete/Produtos", async (req, res) => {
        const code = req.body.rowCode;
        try {
            await deleteProduct(code);
            res.send("Deletado com sucesso");
            return;
        }
        catch (error) {
            res.status(500).send({ errorMessage: "Não foi deletado com sucesso" });
        }
    });

    app.post("/register/Produtos", async (req, res) => {
        try {
            const values = req.body.values;
            const name = values.name;
            const price = values.price;
            const amount = values.amount;
            const desc = values.desc;
            const email = values.email;

            await registerProduct(name, price, amount, desc, email)
            res.send(name + " cadastrado com sucesso");
        }
        catch (error) {
            res.status(500).send({ errorMessage: "Erro 500" });
        }
    });

};

module.exports = { AddProductRoutes };