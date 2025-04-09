require('dotenv').config();
const express = require('express');
const { initializeDb } = require("./db");
const { initializeAdminUser } = require("./initDb");
const { runMigrations } = require("./migrations/migration-runner");
const dbMiddleware = require('./dbMiddleware');
const waitForOracleDB = require('./db/waitForDb');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout', 'layouts/layout', "layout/basic");



const userRouter = require('./routes/users');




app.use(dbMiddleware); // Attach DB connection to each request
app.use('/users', userRouter);


async function initialize() {
  try {
    await waitForOracleDB();
    // Step 1: Create admin user using SYSTEM
    await initializeAdminUser();

    // Step 2: Initialize database connection using ADMIN_USER
    await initializeDb();

    // Step 3: Run migrations using ADMIN_USER
    await runMigrations();

    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
      console.error("Server startup failed:", error);
      process.exit(1);
  }
}

initialize();
