const fs = require('fs');
const path = require('path');
const oracledb = require('oracledb');

// Directory where migration and rollback SQL files are stored
const migrationsDir = path.join(__dirname, 'make-migrations');
const rollbacksDir = path.join(__dirname, 'rollback-migrations');

// Check if we are doing a rollback or a migration
const action = process.argv[2];  // Pass 'migrate' or 'rollback' as an argument

async function run(action) {
    let connection;

    try {
        connection = await oracledb.getConnection({
            user: 'admin',
            password: 'admin',
            connectString: 'localhost:1521/FREE'
        });

        const dir = action === 'rollback' ? rollbacksDir : migrationsDir;
        const files = fs.readdirSync(dir);

        // Sort in reverse order for rollbacks
        if (action === 'rollback') {
            files.sort().reverse();
        } else {
            files.sort();  // Sort in normal order for migrations
        }

        // Loop through each file and execute the SQL
        for (const file of files) {
            if (path.extname(file) === '.sql') {
                const filePath = path.join(dir, file);
                const sql = fs.readFileSync(filePath, 'utf8');

                console.log(`Running ${action}: ${file}`);
                try {
                    await connection.execute(sql);
                    console.log(`Successfully ran ${action}: ${file}`);
                } catch (err) {
                    console.error(`Error running ${action}: ${file}`, err.error);
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

// Run based on the provided action (migrate or rollback)
run(action);
