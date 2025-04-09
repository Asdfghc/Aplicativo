const fs = require('fs');
const path = require('path');
const { getConnection } = require("../db");

const migrationsDir = path.join(__dirname, 'make-migrations');
const rollbacksDir = path.join(__dirname, 'rollback-migrations');  // TODO: Fazer ter como dar rollback mesmo

const action = process.argv[2];  // 'migrate', 'rollback', or 'users'

async function runMigrations(action) {
    let connection;
    try {
        // Default admin connection
        connection = await getConnection();

        // Determine the correct directory
        const dir = action === 'rollback' ? rollbacksDir
                    : migrationsDir;

        const files = fs.readdirSync(dir);
        if (action === 'rollback') {
            files.sort().reverse();  // Rollbacks should run in reverse order
        } else {
            files.sort();
        }

        for (const file of files) {
            if (path.extname(file) === '.sql') {
                const filePath = path.join(dir, file);
                const sql = fs.readFileSync(filePath, 'utf8');

                console.log(`Running ${action}: ${file}`);

                try {
                    const statements = sql.split(';').filter(stmt => stmt.trim());  // Split SQL by `;`
                    for (let statement of statements) {
                        await connection.execute(statement.trim());
                    }
                    console.log(`Successfully ran: ${file}`);
                } catch (err) {
                    console.error(`Error running ${action}: ${file}`, err.message);
                }
            }
        }

    } catch (err) {
        console.error(`Error running ${action}:`, err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error('Error closing connection:', err);
            }
        }
    }
}

module.exports = { runMigrations };