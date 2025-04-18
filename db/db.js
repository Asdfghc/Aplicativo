require("dotenv").config();
const oracledb = require("oracledb");

let pool;

async function initializeDb() {
    try {
        pool = await oracledb.createPool({
            user: process.env.DB_ADMIN_PASSWORD,
            password: process.env.DB_ADMIN_PASSWORD,
            connectString: process.env.DB_CONNECTION_STRING,
            poolMin: 2,
            poolMax: 10,
            poolIncrement: 1,
        });

        console.log("OracleDB Connection Pool Created with ADMIN_USER");
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

module.exports = { initializeDb, getConnection, closeDb };
