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
    console.log("body: ", req.body);
    CPF = CPF.replace(/\D/g, ""); // Remove non-numeric characters from CPF
    password = await bcrypt.hash(password, 10);
    try {
        await req.db.execute(
            "INSERT INTO Usuario (Email, CPF, Nome, Senha) VALUES (:email, :CPF, :name, :password)",
            [email, CPF, name, password]
        );

        await req.db.commit();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Database insert failed" });
    }
});

router.post("/login",
    passport.authenticate("local", {
        successRedirect: "/users/dashboard",
        failureRedirect: "/users/login",
    })
);

router.get("/dashboard", checkAuthenticated, (req, res) => {
    res.send(`Bem-vindo, ${req.user.nome}`);
});

router.post("/logout", (req, res) => {
    req.logout(() => {
        res.redirect("/users/login");
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
