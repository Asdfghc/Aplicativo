const { withDb } = require("../db/db");
const oracledb = require("oracledb");

async function getOrCreateConversa(userId1, userId2) {
    return await withDb(async (connection) => {
        const check = await connection.execute(
            `SELECT id FROM PrivateChats 
             WHERE (sender_user_id = :u1 AND receiver_user_id = :u2) 
                OR (sender_user_id = :u2 AND receiver_user_id = :u1)`,
            { u1: userId1, u2: userId2 }
        );

        if (check.rows.length > 0) {
            return check.rows[0].ID;
        }

        const result = await connection.execute(
            `INSERT INTO PrivateChats (sender_user_id, receiver_user_id)
             VALUES (:u1, :u2) RETURNING id INTO :id`,
            { u1: userId1, u2: userId2, id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER } }
        );

        await connection.commit();
        return result.outBinds.id[0];
    });
}

async function saveMensagem(conversaId, userId, conteudo) {
    console.log(conversaId, userId, conteudo);
    return await withDb(async (connection) => {
        await connection.execute(
            `INSERT INTO PrivateMessages (content, chat_id, sender_user_id)
             VALUES (:conteudo, :conversaId, :userId)`,
            [conteudo, conversaId, userId]
        );
        await connection.commit();
    });
}

async function getMensagens(conversaId) {
    return await withDb(async (connection) => {
        const result = await connection.execute(
            `SELECT pm.content, pm.timestamp, u.name 
             FROM PrivateMessages pm
             JOIN Users u ON pm.sender_user_id = u.id
             WHERE pm.chat_id = :conversaId
             ORDER BY pm.timestamp ASC`,
            [conversaId]
        );
        return result.rows.map(row => ({
            conteudo: row.CONTENT,
            timestamp: row.TIMESTAMP,
            nome: row.NAME,
        }));
    });
}

module.exports = {
    getOrCreateConversa,
    saveMensagem,
    getMensagens,
};
