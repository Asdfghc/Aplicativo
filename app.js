require('dotenv').config();
const express = require('express');
const oracledb = require('oracledb');

const app = express();
const port = 3000;

const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout', 'layouts/layout');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

async function initializeOracle() {
  try {
    await oracledb.createPool({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectionString: process.env.DB_CONNECTION_STRING
    });
    console.log('Oracle DB connected');
  } catch (err) {
    console.error('Error connecting to Oracle DB:', err);
  }
}

app.get('/', async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection();
    const result = await connection.execute('SELECT \'a!!!!!!\' FROM dual');
    res.render('index', { title: 'Hello World!', message: result.rows[0][0] });
  } catch (err) {
    res.status(500).send(`Error querying database: ${err.message}`);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing connection', err);
      }
    }
  }
});


const userRouter = require('./routes/users');
app.use('/users', userRouter);





app.listen(port, async () => {
  await initializeOracle();
  console.log(`Express server listening on port ${port}`);
});
