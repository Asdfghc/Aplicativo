const { withDb } = require("../db/db");
const oracledb = require("oracledb");


async function getOrCreateConversa(userId1, userId2) {
    return await withDb(async (connection) => {
        const check = await connection.execute(
            `SELECT ID_Conversa FROM Conversa 
             WHERE (ID_Usuario1 = :u1 AND ID_Usuario2 = :u2) 
                OR (ID_Usuario1 = :u2 AND ID_Usuario2 = :u1)`,
            { u1: userId1, u2: userId2 }
        );

        if (check.rows.length > 0) {
            return check.rows[0][0]; // ID_Conversa
        }

        const result = await connection.execute(
            `INSERT INTO Conversa (ID_Usuario1, ID_Usuario2)
             VALUES (:u1, :u2) RETURNING ID_Conversa INTO :id`,
            { u1: userId1, u2: userId2, id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER } }
        );

        await connection.commit();
        return result.outBinds.id[0];
    });
}

async function saveMensagem(conversaId, userId, conteudo) {
    return await withDb(async (connection) => {
        await connection.execute(
            `INSERT INTO Mensagem (Conteudo, ID_Conversa, ID_Usuario)
             VALUES (:conteudo, :conversaId, :userId)`,
            [conteudo, conversaId, userId]
        );
        await connection.commit();
    });
}

async function getMensagens(conversaId) {
    return await withDb(async (connection) => {
        const result = await connection.execute(
            `SELECT m.Conteudo, m.Timestamp, u.Nome 
             FROM Mensagem m
             JOIN Usuario u ON m.ID_Usuario = u.ID_Usuario
             WHERE m.ID_Conversa = :conversaId
             ORDER BY m.Timestamp ASC`,
            [conversaId]
        );
        return result.rows;
    });
}

module.exports = {
    getOrCreateConversa,
    saveMensagem,
    getMensagens,
};
