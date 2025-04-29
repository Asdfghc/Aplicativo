// require("dotenv").config();
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

        // Step 2: Check if ADMIN_USER already exists as USER
        const userResult = await sysConnection.execute(
            `SELECT COUNT(*) FROM all_users WHERE username = :username`,
            { username: ADMIN_USERNAME }
        );

        // Step 3: Check if ADMIN_USER already exists as ROLE
        const roleResult = await sysConnection.execute(
            `SELECT COUNT(*) FROM dba_roles WHERE role = :username`,
            { username: ADMIN_USERNAME }
        );

        if (userResult.rows[0][0] === 0 && roleResult.rows[0][0] === 0) {
            console.log(`Creating user ${ADMIN_USERNAME}...`);

            // Step 4: Create the ADMIN_USER
            await sysConnection.execute(
                `CREATE USER "${ADMIN_USERNAME}" IDENTIFIED BY "${ADMIN_PASSWORD}"`
            );
            await sysConnection.execute(
                `GRANT CONNECT, RESOURCE, DBA, CREATE SESSION TO "${ADMIN_USERNAME}"`
            );

            console.log(`User ${ADMIN_USERNAME} created successfully.`);
        } else if (userResult.rows[0][0] > 0) {
            console.log(`User ${ADMIN_USERNAME} already exists.`);
        } else {
            console.log(`A role named ${ADMIN_USERNAME} already exists. Cannot create user.`);
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
