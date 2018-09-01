
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cons = require('consolidate');
const dust = require('dustjs-helpers');
const { Pool, Client } = require('pg')

const pool = new Pool({
  user: 'alex',
  host: 'localhost',
  database: 'api-dev',
  password: '123',
  port: 5432,
})

const app = express();
// * DB connect string
const connectString = 'postgres://alex:123@localhost/api-dev';

// Assign Dust engine to .dust files
app.engine('dust', cons.dust);

// Set Default extension .dust
app.set('view engine', 'dust');
app.set('views', __dirname + '/views');

//Set public folder 
app.use(express.static(path.join(__dirname, 'public')));

//Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  pool.query('SELECT * FROM testtable', (err, result) => {
    // if(err) { res.status(500).send(err) };
    res.render('index', { testtable: result && result.rows });
    // pool.end();
  });
});

// Server
app.listen(3000, () => {
  console.log('Server start on port 3000...');
})