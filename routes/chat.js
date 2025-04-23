const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("chat/menu", {layout:"layouts/chats"});
});

// Página do chat (simulação de conversa entre 2 usuários)
router.get("/:roomId", (req, res) => {
    const roomId = req.params.roomId;
    const user = 1;
    //const user = {1};
    console.log(roomId, user);
    res.render("chat/chat", { roomId, user , layout:"layouts/chats"});
});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next(); // Usuário autenticado, prossiga para a próxima função
    }
    req.flash("error", "Você precisa estar logado para acessar esta página.");
    res.redirect("/users/login"); // Redirecione para a página de login
}

module.exports = router;
