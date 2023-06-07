const { getUserPassword, verifyUserEqual, registerUser } = require('../Query.js');

const bcrypt = require("bcrypt");
const saltRounds = 10;

function AddUserRoutes(app) {
    app.post("/login", async (req, res) => {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const cryptedPassword = await getUserPassword(email);
            const result = bcrypt.compareSync(password, cryptedPassword)
            if (result) {
                res.send({ msg: "Usuário Logado" })
            } else {
                res.status(400).send({ errorMessage: "Email ou Senha Invalido" })
            };
        }
        catch (error) {
            res.status(500).send(error);
        }
    });

    app.post("/register/user", async (req, res) => {
        try {
            const name = req.body.name;
            const email = req.body.email;
            const password = req.body.password;
            const salonName = req.body.salonName;

            const IsEqual = await verifyUserEqual(email);

            if (!IsEqual) {
                bcrypt.hash(password, saltRounds, async (err, hash) => {
                    await registerUser(name, email, hash, salonName);
                    res.send("Usuário cadastrado com sucesso");
                    return;
                });
            } else {
                res.status(400).send({ errorMessage: "Usuário já cadastrado" })
                return;
            }

        }
        catch (error) {
            res.status(500).send(error);
        }
    });
};

module.exports = { AddUserRoutes };