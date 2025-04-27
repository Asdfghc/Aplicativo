const express = require("express");
const router = express.Router();

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
        `SELECT ID_CONVERSA FROM CONVERSA WHERE ID_CONVERSA = :roomId AND (ID_USUARIO1 = :userId OR ID_USUARIO2 = :userId)`,
        { roomId, userId: user.id }
    );
    if (result.rows.length === 0) {
        req.flash("error", "Você não tem permissão para acessar esta conversa.");
        return res.redirect("/chat");
    }

    try {
        const conversas = await listarConversasComNomes(req.db, req.user.id);
        res.render("chat/chat", { conversas, roomId, user, layout:"layouts/chats"});
    } catch (err) {
        console.error("Erro ao buscar conversas:", err);
        res.status(500).send("Erro interno.");
    }
});

// TODO: Tranformar em middleware
async function listarConversasComNomes(db, userId) {
    const result = await db.execute(
        `SELECT 
            c.ID_CONVERSA,
            CASE 
                WHEN c.ID_USUARIO1 = :userId THEN c.ID_USUARIO2
                ELSE c.ID_USUARIO1
            END AS outro_usuario_id
        FROM CONVERSA c
        WHERE c.ID_USUARIO1 = :userId OR c.ID_USUARIO2 = :userId`,
        { userId }
    );

    const conversas = result.rows.map(row => ({
        id: row[0],
        outroUsuarioId: row[1]
    }));

    if (conversas.length === 0) return [];

    const ids = conversas.map(c => c.outroUsuarioId);

    const nomeResult = await db.execute(
        `SELECT ID_USUARIO, NOME FROM USUARIO WHERE ID_USUARIO IN (${ids.map((_, i) => `:${i}`).join(", ")})`,
        ids
    );

    const idToNome = {};
    nomeResult.rows.forEach(row => {
        idToNome[row[0]] = row[1];
    });

    const conversasComNome = conversas.map(c => ({
        id: c.id,
        nome: idToNome[c.outroUsuarioId] || "Desconhecido"
    }));

    return conversasComNome;
}

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next(); // Usuário autenticado, prossiga para a próxima função
    }
    req.flash("error", "Você precisa estar logado para acessar esta página.");
    res.redirect("/users/login"); // Redirecione para a página de login
}

module.exports = router;
