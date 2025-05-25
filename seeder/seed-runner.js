const fs = require('fs');
const path = require('path');
const { getConnection, initializeDb } = require("../db/db");

const seedsDir = path.join(__dirname, 'seeds');

async function runSeeds() {
    let connection;
    try {
        connection = await getConnection();

        const files = fs.readdirSync(seedsDir).filter(file => path.extname(file) === '.sql');
        files.sort();

        for (const file of files) {
            const filePath = path.join(seedsDir, file);
            const sql = fs.readFileSync(filePath, 'utf8');

            console.log(`Running seed: ${file}`);

            try {
                const statements = sql.split(';').filter(stmt => stmt.trim());
                for (let statement of statements) {
                    await connection.execute(statement.trim());
                }
                await connection.commit();
                console.log(`Successfully ran: ${file}`);
            } catch (err) {
                await connection.rollback();
                console.error(`Error running seed: ${file}`, err.message);
            }
        }

    } catch (err) {
        console.error(`Error running seeds:`, err);
        if (connection) {
            try {
                await connection.rollback();
            } catch (rollbackErr) {
                console.error('Error during rollback:', rollbackErr);
            }
        }
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

if (require.main === module) {
    initializeDb().then(() => {
        return runSeeds();
    }).then(() => {
        console.log('Seeding process ended.');
        process.exit(0);
    }).catch((err) => {
        console.error("Failed to run seeds:", err);
        process.exit(1);
    });
}

module.exports = { runSeeds };
