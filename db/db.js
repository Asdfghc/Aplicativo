// require("dotenv").config();
const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OBJECT;
oracledb.fetchAsString = [oracledb.CLOB];

let pool;

async function initializeDb() {
    try {
        pool = await oracledb.createPool({
            user: process.env.DB_ADMIN_USERNAME,
            password: process.env.DB_ADMIN_PASSWORD,
            connectString: process.env.DB_CONNECTION_STRING,
            poolMin: 2,
            poolMax: 10,
            poolIncrement: 1,
        });

        console.log("OracleDB Connection Pool Created with ADMIN_USER");
        return await pool.getConnection();
    } catch (error) {
        console.error("Database Initialization Failed:", error);
        process.exit(1);
    }
}

async function getConnection() {
    return await pool.getConnection();
}

async function closeDb() {
    if (pool) {
        await pool.close();
        console.log("Database Connection Pool Closed");
    }
}

async function withDb(callback) {
    let connection;
    try {
        connection = await getConnection();
        const result = await callback(connection);
        return result;
    } catch (err) {
        console.error("Error in withDb:", err);
        throw err; // Re-throw the error to be handled by the caller
    } finally {
        if (connection) {
            try {
                await connection.close();
                console.log("Conexão com o banco fechada (withDb).");
            } catch (closeErr) {
                console.error("Erro ao fechar conexão:", closeErr);
            }
        }
    }
}

module.exports = { initializeDb, getConnection, closeDb, withDb };
