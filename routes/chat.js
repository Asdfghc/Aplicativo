const express = require("express");
const router = express.Router();

// Página do chat (simulação de conversa entre 2 usuários)
router.get("/:roomId", checkAuthenticated, (req, res) => {
    const roomId = Number(req.params.roomId);
    const user = req.user;
    //const user = {1};
    console.log(roomId, user);
    res.render("chat/chat", { roomId, user, layout: "layouts/basic" });
});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next(); // Usuário autenticado, prossiga para a próxima função
    }
    req.flash("error", "Você precisa estar logado para acessar esta página.");
    res.redirect("/users/login"); // Redirecione para a página de login
}

module.exports = router;
