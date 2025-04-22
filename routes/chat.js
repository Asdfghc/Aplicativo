const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("chat/menu", {layout:"layouts/chats"});
});

// Página do chat (simulação de conversa entre 2 usuários)
router.get("/:roomId", (req, res) => {
    const roomId = req.params.roomId;
    const user = { id: req.session.userId || 1 }; // Simula ID do usuário logado
    res.render("chat/chat", { roomId, user , layout:"layouts/chats"});
});

module.exports = router;
