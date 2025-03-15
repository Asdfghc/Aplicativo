const oracledb = require('oracledb');
const fs = require('fs');
const path = require('path');

const migrationDir = path.join(__dirname, 'migrations');

// OracleDB connection configuration
const dbConfig = {
    user: "admin", //TODO: pegar o .env
    password: "admin",
    connectString: "localhost:1521/FREE"  // Docker container setup
};

async function runMigrations() {
    let connection;

    try {
        connection = await oracledb.getConnection(dbConfig);
        const files = fs.readdirSync(migrationDir).sort();

        for (const file of files) {
            const filePath = path.join(migrationDir, file);
            const sql = fs.readFileSync(filePath, 'utf8');
            console.log(`Executing SQL: ${sql}`);  // Log SQL before execution
            await connection.execute(sql);
            console.log(`Successfully ran migration: ${file}`);
        }
        
        await connection.commit();
    } catch (err) {
        console.error("Error running migrations:", err);
        if (connection) await connection.rollback();
    } finally {
        if (connection) await connection.close();
    }
}

// Run migrations
runMigrations().catch(console.error);
