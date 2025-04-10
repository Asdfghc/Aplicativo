const { getConnection } = require("./db");

async function dbMiddleware(req, res, next) {
    let connection;
    try {
        connection = await getConnection(); // Get a connection from the pool
        req.db = connection; // Attach connection to the request object
        next(); // Proceed to the next middleware/route
    } catch (error) {
        console.error("Database connection error:", error);
        res.status(500).json({ error: "Database connection failed" });
    } finally {
        // Ensure the connection is closed after response is sent
        res.on("finish", async () => {
            if (connection) {
                await connection.close();
                console.log("Database connection closed.");
            }
        });
    }
}

module.exports = dbMiddleware;
