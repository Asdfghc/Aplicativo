const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const fetch = require("node-fetch");
const oracledb = require('oracledb');
const router = express.Router();
const { getOrCreateConversa } = require("../chat/chatService");

const SECRET_KEY = "6Lef4iErAAAAAF2qKt1Bd180f09bddXtq2QrMDDw";

// middleware de verificação do reCAPTCHA v3
async function verificaRecaptcha(req, res, next) {
    const token = req.body["g-recaptcha-token"];
    if (!token) {
        req.flash("error", "Falha no reCAPTCHA. Tente novamente.");
        return res.redirect("/users/new");
    }

    try {
        const googleRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `secret=${SECRET_KEY}&response=${token}`,
        });
        const dados = await googleRes.json();

        if (!dados.success || dados.score < 0.5 || dados.action !== "signup") {
            req.flash("error", "reCAPTCHA identificou atividade suspeita.");
            return res.redirect("/users/new");
        }
        next();
    } catch (err) {
        console.error("Erro reCAPTCHA:", err);
        req.flash("error", "Erro ao validar reCAPTCHA.");
        res.redirect("/users/new");
    }
}

router.get("/new", async (req, res) => {
    res.render("users/new", { layout: "layouts/basic" });
});

router.get("/login", async (req, res) => {
    res.render("users/login", { layout: "layouts/basic" });
});

router.get("/self", async (req, res) => {
    if (!req.isAuthenticated()) {
        res.redirect("/users/login");
    } else {
        res.redirect("/users/" + req.user.id);
    }
});

router.post("/new", verificaRecaptcha, async (req, res) => {
    let { name, email, CPF, password } = req.body;

    if (!name || !email || !CPF || !password) {
        req.flash("error", "Preencha todos os campos!");
        return res.redirect("/users/new");
    }

    //console.log("body: ", req.body);
    CPF = CPF.replace(/\D/g, ""); // Remove non-numeric characters from CPF
    password = await bcrypt.hash(password, 10);
    try {
        const result_auth = await req.db.execute(
            `INSERT INTO Auth (username, hashed_pwd, status, role)
             VALUES (:username, :hashed_pwd, :status, :role)
             RETURNING id INTO :id`,
            {
                username: email,
                hashed_pwd: password,
                status: "ACTIVE",
                role: "USER",
                id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER } // Captura o ID
            }
        );
          
        const newId = result_auth.outBinds.id[0];
        //console.log("ID gerado:", newId);
          
        await req.db.execute(
            "INSERT INTO Users (auth_id, name, email, document_number) VALUES (:auth_id, :name, :email, :CPF)",
            {
                auth_id: newId,
                name,
                email,
                CPF
            }
        ); // TODO: Outros campos
        await req.db.commit();

        // Fetch the newly created user for login
        const result = await req.db.execute("SELECT * FROM Users WHERE email = :email", [email]);

        const user = result.rows[0];
        const userObj = {
            id: user.ID,
            email: user.EMAIL,
            nome: user.NAME,
        };

        req.login(userObj, (err) => {
            if (err) return next(err);
            req.flash("success", "Usuário criado com sucesso!");
            res.redirect("/users/self");
        });
    } catch (error) {
        console.error("Error creating user:", error);
        req.flash("error", "Erro ao criar usuário. Tente novamente.");
        res.redirect("/users/new");
    }
});

router.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/users/login",
        successFlash: "Login realizado com sucesso!",
        failureFlash: "Email ou senha inválidos",
    })
);

router.post("/logout", (req, res) => {
    req.flash("success", `Até mais, ${req.user.nome}!`);
    req.logout(() => {
        res.redirect("/");
    });
});

router.get("/:userId", async (req, res) => {
    const userId = req.params.userId;

    try {
        const result = await req.db.execute(
            "SELECT * FROM Users WHERE id = :userId",
            [userId],
            { outFormat: oracledb.OBJECT }
        );
        const user = result.rows[0];


        if (!user) {
            req.flash("error", "Usuário não encontrado.");
            return res.redirect("/");
        }

        const dono = req.isAuthenticated() && req.user.id == userId;
        const username = user.NAME;
        const description = user.BIO || "";

        res.render("users/user", { username, userId, dono, description });
    } catch (error) {
        console.error("Error fetching user:", error);
        req.flash("error", "Erro ao buscar usuário. Tente novamente.");
        res.redirect("/");
    }
});


router.post("/:userId", checkAuthenticated, async (req, res) => {
    const user1Id = req.params.userId;
    const user2Id = req.user.id;

    try {
        const conversa = await getOrCreateConversa(user1Id, user2Id);
        console.log("CONVERSA: ", conversa);
        res.redirect("/chat/" + conversa);
    } catch (error) {
        console.error("Error creating conversation:", error);
        req.flash("error", "Erro ao criar conversa. Tente novamente.");
        res.redirect("/users/" + user1Id);
    }
});




router.post("/:userId/description", checkAuthenticated, async (req, res) => {
    const userId = req.params.userId;
    const novaDescricao = req.body.description;

    if (req.user.id != userId) {
        req.flash("error", "Você não pode editar esse perfil.");
        return res.redirect(`/users/${userId}`);
    }

    console.log("new description:", novaDescricao);

    try {
        await req.db.execute(
            `UPDATE Users SET bio = :bio WHERE id = :id`,
            {
                bio: { val: novaDescricao, type: oracledb.STRING },
                id: userId
            }
        );

        await req.db.commit();

        req.flash("success", "Descrição atualizada.");
    } catch (err) {
        console.error("Erro ao salvar descrição:", err);
        req.flash("error", "Erro ao atualizar descrição.");
    }

    res.redirect(`/users/${userId}`);
});
 




function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) return next();
    req.flash("error", "Você precisa estar logado para acessar essa página.");
    res.redirect("/users/login");
} //TODO: mover para middleware

module.exports = router;