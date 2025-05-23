const fs = require('fs');
const path = require('path');
const { getConnection, initializeDb } = require("../db/db");

const migrationsDir = path.join(__dirname, 'make-migrations');
const dropsDir = path.join(__dirname, 'drop-migrations');

async function runMigrations(action) {
    let connection;
    try {
        // Default admin connection
        connection = await getConnection();

        // Determine the correct directory
        const dir = action === 'drop' ? dropsDir
                    : migrationsDir;

        const files = fs.readdirSync(dir);
        if (action === 'drop') {
            files.sort().reverse();  // Drops should run in reverse order
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
                        try {
                            await connection.execute(statement.trim());
                        }
                        catch (err) {
                            console.error(`Error executing statement in ${file}:`, err.message);
                        }
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

// Só executa se for chamado diretamente via terminal
if (require.main === module) {
    const action = process.argv[2];
    initializeDb().then(() => {
        return runMigrations(action);
    }).then(() => {
        console.log('Migration process ended.');
        process.exit(0);
    }).catch((err) => {
        console.error("Failed to run migrations:", err);
        process.exit(1);
    });
}

module.exports = { runMigrations };