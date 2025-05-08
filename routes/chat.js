const express = require("express");
const router = express.Router();
const { getMensagens } = require("../chat/chatService");

router.get("/", checkAuthenticated, async (req, res) => {
    try {
        const conversas = await listarConversasComNomes(req.db, req.user.id);
        res.render("chat/menu", { conversas, layout: "layouts/chats" });
    } catch (err) {
        console.error("Erro ao buscar conversas:", err);
        res.status(500).send("Erro interno.");
    }
});

// Página do chat (simulação de conversa entre 2 usuários)
router.get("/:roomId", checkAuthenticated, async (req, res) => {
    const roomId = req.params.roomId;
    const user = req.user;

    // Verifica se o usuário está na conversa
    const result = await req.db.execute(
        `SELECT id FROM PrivateChats WHERE id = :roomId AND (sender_user_id = :userId OR receiver_user_id = :userId)`,
        { roomId, userId: user.id }
    );
    if (result.rows.length === 0) {
        req.flash("error", "Você não tem permissão para acessar esta conversa.");
        return res.redirect("/chat");
    }

    try {
        const conversas = await listarConversasComNomes(req.db, req.user.id);
        const mensagens = await getMensagens(roomId);
        //console.log("CONVERSAS: ", conversas);
        //console.log("CONVERSA: ", conversas.find(c => c.id == roomId));
        //console.log("MENSAGENS: ", mensagens);
        const outroUsuarioNome = conversas.find(c => c.id == roomId).nome;
        res.render("chat/chat", { conversas, mensagens, outroUsuarioNome, roomId, user, layout:"layouts/chats" });
    } catch (err) {
        console.error("Erro ao buscar conversas:", err);
        res.status(500).send("Erro interno.");
    }
});

// TODO: Tranformar em middleware
async function listarConversasComNomes(db, userId) {
    const result = await db.execute(
        `
        SELECT 
            pc.id AS conversation_id,
            u.id AS user_id,
            u.name AS user_name
        FROM PrivateChats pc
        JOIN Users u
            ON u.id = CASE
                WHEN pc.sender_user_id = :userId THEN pc.receiver_user_id
                ELSE pc.sender_user_id
            END
        WHERE pc.sender_user_id = :userId OR pc.receiver_user_id = :userId
        `,
        { userId }
    );

    const conversas = result.rows.map(row => ({
        id: row.CONVERSATION_ID,
        outroUsuarioId: row.USER_ID,
        nome: row.USER_NAME
    }));

    return conversas;
}

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next(); // Usuário autenticado, prossiga para a próxima função
    }
    req.flash("error", "Você precisa estar logado para acessar esta página.");
    res.redirect("/users/login"); // Redirecione para a página de login
}

module.exports = router;
