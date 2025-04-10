require("dotenv").config();
const oracledb = require("oracledb");

const config = {
    user: "system",
    password: process.env.DB_SYSTEM_PASSWORD,
    connectString: process.env.DB_CONNECTION_STRING,
};

async function waitForOracleDB(maxRetries = 20, delay = 5000) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const connection = await oracledb.getConnection(config);
            await connection.close();
            console.log("✅ Oracle DB is ready!");
            return;
        } catch (err) {
            console.log(
                `⏳ DB not ready (${i + 1}/${maxRetries}): ${err.message}`
            );
            await new Promise((res) => setTimeout(res, delay));
        }
    }
    throw new Error("❌ Database not ready after max retries.");
}

module.exports = waitForOracleDB;
