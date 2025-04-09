const oracledb = require("oracledb");

let pool;

async function initializeDb() {
    try {
        pool = await oracledb.createPool({
            user: "ADMIN_USER",  // Now using the created admin user
            password: "admin_password",
            connectString: "oracle-db:1521/FREE",
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
