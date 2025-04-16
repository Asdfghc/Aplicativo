const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const router = express.Router();

router.get("/new", async (req, res) => {
    res.render("users/new", { layout: "layouts/basic" });
});

router.get("/login", async (req, res) => {
    res.render("users/login", { layout: "layouts/basic" });
});

router.get("/", async (req, res) => {
    try {
        const result = await req.db.execute("SELECT * FROM Usuario");
        console.log("result: ", result);
        res.render("index", { message: result.rows });
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).send("Error fetching users");
    }
});

router.post("/new", async (req, res) => {
    let { name, email, CPF, password } = req.body;

    if (!name || !email || !CPF || !password) {
        req.flash("error", "Preencha todos os campos!");
        return res.redirect("/users/new");
    }

    console.log("body: ", req.body);
    CPF = CPF.replace(/\D/g, ""); // Remove non-numeric characters from CPF
    password = await bcrypt.hash(password, 10);
    try {
        await req.db.execute(
            "INSERT INTO Usuario (Email, CPF, Nome, Senha) VALUES (:email, :CPF, :name, :password)",
            [email, CPF, name, password]
        );
        await req.db.commit();

        // Pega o usuário recém-criado para logar
        const result = await req.db.execute(
            "SELECT * FROM Usuario WHERE Email = :email",
            [email]
        );

        const user = result.rows[0];
        const userObj = {
            id: user[0],     // ID
            email: user[1],  // Email
            nome: user[3]    // Nome
        };

        req.login(userObj, (err) => {
            if (err) return next(err);
            req.flash("success", "Usuário criado com sucesso!");
            res.redirect("/users/dashboard");
        });
    } catch (error) {
        console.error("Error creating user:", error);
        req.flash("error", "Erro ao criar usuário. Tente novamente.");
        res.redirect("/users/new");
    }
});

router.post("/login",
    passport.authenticate("local", {
        successRedirect: "/users/dashboard",
        failureRedirect: "/users/login",
        successFlash: "Login realizado com sucesso!",
        failureFlash: "Email ou senha inválidos"
    })
);

router.get("/dashboard", checkAuthenticated, (req, res) => {
    res.send(`Bem-vindo, ${req.user.nome}`);
});

router.post("/logout", (req, res) => {
    req.logout(() => {
        req.flash(`success", "Até mais, ${req.user.nome}!`);
        res.redirect("/");
    });
});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/users/login");
}

/*
// Teste de rotas
router
    .route("/:id")
    .get(async (req, res) => {
        console.log(req.user);
        res.send("usuario " + req.params.id);
    })
    .put(async (req, res) => {
        res.send("usuario " + req.params.id + " atualizado");
    })
    .delete(async (req, res) => {
        res.send("usuario " + req.params.id + " deletado");
    });
*/

module.exports = router;
