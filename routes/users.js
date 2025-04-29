const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const fetch = require("node-fetch");
const router = express.Router();
const { getOrCreateConversa } = require("../chat/chatService");

const SECRET_KEY = '6Lef4iErAAAAAF2qKt1Bd180f09bddXtq2QrMDDw';

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
      body: `secret=${SECRET_KEY}&response=${token}`
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

router.get("/self", checkAuthenticated, async (req, res) => {
        res.redirect("/users/" + req.user.id);
});

router.post("/new", verificaRecaptcha, async (req, res) => {
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
        id:    user[0], // ID
        email: user[1], // Email
        nome:  user[3]  // Nome
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
  }
);

router.post("/login",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/users/login",
        successFlash: "Login realizado com sucesso!",
        failureFlash: "Email ou senha inválidos"
    })
);

router.get("/:userId", (req, res) => {
    const userId = req.params.userId;
    var dono = false;
    if (req.isAuthenticated()) {
        if (userId == req.user.id) {
            dono = true;
        }
    }

    res.render("users/user", { userId, dono });
});

router.post("/:userId", checkAuthenticated, async (req, res) => {
    const user1Id = req.params.userId;
    const user2Id = req.user.id;

    try {
        await getOrCreateConversa(user1Id, user2Id);
        
        req.flash("success", "Conversa criada com sucesso!");
        res.redirect("/chat");
    } catch (error) {
        console.error("Error creating conversation:", error);
        req.flash("error", "Erro ao criar conversa. Tente novamente.");
        res.redirect("/users/" + user1Id);
    }
});

router.post("/logout", (req, res) => {
  req.logout(() => {
    req.flash(`success", "Até mais, ${req.user.nome}!`);
    res.redirect("/");
  });
});

function checkAuthenticated(req, res, next) {

    if (req.isAuthenticated()) return next();
    req.flash("error", "Você precisa estar logado para acessar essa página.");
    res.redirect("/users/login");
} //TODO: mover para middleware

module.exports = router;
