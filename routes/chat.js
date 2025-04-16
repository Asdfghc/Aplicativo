const express = require("express");
const router = express.Router();

// Página do chat (simulação de conversa entre 2 usuários)
router.get("/:roomId", (req, res) => {
    const roomId = req.params.roomId;
    const user = { id: req.session.userId || 1 }; // Simula ID do usuário logado
    res.render("chat/chat", { roomId, user , layout:"layouts/basic"});
});

module.exports = router;
