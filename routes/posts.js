const express = require("express");
const router = express.Router();

// GET
router.get("/create", checkAuthenticated, async (req, res) => {
    res.render("posts/create", { layout: "layouts/basic" });
});

//POST
router.post("/create", checkAuthenticated, async (req, res) => {
    let { description, lostOrFound, lastSeen, dateLost } = req.body;

    if (!description || !lostOrFound || !lastSeen || !dateLost) {
        req.flash("error", "Preencha todos os campos.");
        return res.redirect("/posts/create");
    }

    try {
        await req.db.execute(
            "INSERT INTO Postagem (Descricao, Achado_ou_perdido, Ultimo_local_visto, Data_quando_perdeu) VALUES (:description, :lostOrFound, :lastSeen, :dateLost)",
            [description, lostOrFound, lastSeen, dateLost]
        );
        await req.db.commit();
        req.flash("success", "Postagem criada com sucesso.");
        res.redirect("/posts/create");
    } catch (err) {
        console.error("Erro ao criar postagem:", err);
        req.flash("error", "Erro ao criar postagem.");
        res.redirect("/posts/create");
    }
});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next(); // Usuário autenticado, prossiga para a próxima função
    }
    req.flash("error", "Você precisa estar logado para acessar esta página.");
    res.redirect("/users/login"); // Redirecione para a página de login
}

module.exports = router;