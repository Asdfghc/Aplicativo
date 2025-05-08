// require("dotenv").config();
const oracledb = require("oracledb");

const ADMIN_USERNAME = process.env.DB_ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.DB_ADMIN_PASSWORD;

async function initializeAdminUser() {
    let sysConnection;
    try {
        sysConnection = await oracledb.getConnection({
            user: "system",
            password: process.env.DB_SYSTEM_PASSWORD,
            connectString: process.env.DB_CONNECTION_STRING,
        });

        const userResult = await sysConnection.execute(
            `SELECT COUNT(*) AS COUNT FROM all_users WHERE username = :username`,
            { username: ADMIN_USERNAME }
        );

        const roleResult = await sysConnection.execute(
            `SELECT COUNT(*) AS COUNT FROM dba_roles WHERE role = :username`,
            { username: ADMIN_USERNAME }
        );

        const userCount = userResult.rows[0].COUNT;
        const roleCount = roleResult.rows[0].COUNT;

        if (userCount === 0 && roleCount === 0) {
            console.log(`Creating user ${ADMIN_USERNAME}...`);

            await sysConnection.execute(
                `CREATE USER "${ADMIN_USERNAME}" IDENTIFIED BY "${ADMIN_PASSWORD}"`
            );
            await sysConnection.execute(
                `GRANT CONNECT, RESOURCE, DBA, CREATE SESSION TO "${ADMIN_USERNAME}"`
            );

            console.log(`User ${ADMIN_USERNAME} created successfully.`);
        } else if (userCount > 0) {
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
