
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cons = require('consolidate');
const dust = require('dustjs-helpers');
const pg = require('pg');

const app = express();
// * DB connect string
const connect = 'postgres://alex:123@localhost/api-dev';

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
  res.render('index');
})

// Server
app.listen(3000, () => {
  console.log('Server start on port 3000...');
})