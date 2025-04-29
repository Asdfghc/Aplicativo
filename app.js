require("dotenv").config();
const express = require("express");
const { initializeDb } = require("./db/db");
const { initializeAdminUser } = require("./db/initDb");
const { runMigrations } = require("./migrations/migration-runner");
const { runSeeds } = require("./seeder/seed-runner");
const dbMiddleware = require("./db/dbMiddleware");
const waitForOracleDB = require("./db/waitForDb");

const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);
app.set("layout", "layouts/layout", "layout/basic");

const userRouter = require("./routes/users");

app.use(dbMiddleware); // Attach DB connection to each request
app.use("/users", userRouter);

async function initialize() {
    try {
        await waitForOracleDB();
        await initializeAdminUser();
        await initializeDb();
        //await runMigrations('drop');
        await runMigrations();
        await runSeeds();

        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error);
        process.exit(1);
    }
}

initialize();
