const fs = require('fs');
const path = require('path');
const oracledb = require('oracledb');

// Directory where migration and rollback SQL files are stored
const migrationsDir = path.join(__dirname, 'make-migrations');
const rollbacksDir = path.join(__dirname, 'rollback-migrations');
const usersMigrationsDir = path.join(__dirname, 'make-users');

// Check if we are doing a rollback or a migration
const action = process.argv[2];  // Pass 'migrate', 'rollback', or 'users' as an argument

async function run(action) {
    let connection;

    try {
        if (action === 'users') {
            // Connect as system user to run user-specific migrations
            connection = await oracledb.getConnection({
                user: 'system',
                password: 'senha',  // Use the correct password for the system user
                connectString: 'localhost:1521/FREE'
            });

            // Use the users migration folder
            var dir = usersMigrationsDir;
        } else {
            // Connect as admin user for normal migrations or rollbacks
            connection = await oracledb.getConnection({
                user: 'admin',
                password: 'admin',  // Default admin user and password
                connectString: 'localhost:1521/FREE'
            });

            // Use the default migration or rollback folder
            var dir = action === 'rollback' ? rollbacksDir : migrationsDir;
        }

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
                    // Split the SQL into individual commands
                    const statements = sql.split(';').filter(Boolean);  // Split by semicolon and filter out empty commands

                    for (let statement of statements) {
                        statement = statement.trim();  // Remove any extra whitespace
                        if (statement) {
                            await connection.execute(statement);  // Execute each SQL command individually
                            //console.log(`Executed: ${statement}`);
                        }
                    }
                    console.log(`Successfully ran: ${file}`);
                } catch (err) {
                    console.error(`Error running ${action}: ${file}`, err);
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

// Run based on the provided action ('migrate', 'rollback', or 'users')
run(action);
