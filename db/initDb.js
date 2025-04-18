require("dotenv").config();
const oracledb = require("oracledb");

const ADMIN_USERNAME = process.env.DB_ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.DB_ADMIN_PASSWORD;

async function initializeAdminUser() {
    let sysConnection;
    try {
        // Step 1: Connect using SYSTEM user
        sysConnection = await oracledb.getConnection({
            user: "system", // Use SYSTEM user to create ADMIN_USER
            password: process.env.DB_SYSTEM_PASSWORD,
            connectString: process.env.DB_CONNECTION_STRING,
        });

        // Step 2: Check if ADMIN_USER already exists
        const result = await sysConnection.execute(
            `SELECT COUNT(*) FROM all_users WHERE username = :username`,
            [ADMIN_USERNAME]
        );

        if (result.rows[0][0] === 0) {
            console.log(`Creating user ${ADMIN_USERNAME}...`);

            // Step 3: Create the ADMIN_USER
            await sysConnection.execute(
                `CREATE USER ${ADMIN_USERNAME} IDENTIFIED BY ${ADMIN_PASSWORD}`
            );
            await sysConnection.execute(
                `GRANT CONNECT, RESOURCE, DBA TO ${ADMIN_USERNAME}`
            );

            console.log(`User ${ADMIN_USERNAME} created successfully.`);
        } else {
            console.log(`User ${ADMIN_USERNAME} already exists.`);
        }

        await sysConnection.commit();
    } catch (error) {
        console.error("Error initializing admin user:", error);
    } finally {
        if (sysConnection) {
            await sysConnection.close();
        }
    }
}

module.exports = { initializeAdminUser };
