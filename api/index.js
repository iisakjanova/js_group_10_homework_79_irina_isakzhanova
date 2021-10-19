const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const items = require('./app/items');
const categories = require('./app/categories');
const locations = require('./app/locations');

const app = express();
const port = 8000;

const con = mysql.createConnection({
    host: "localhost",
    user: "user",
    password: "25102510"
});

app.use(express.json());
app.use(cors());

app.use('/categories', categories);
app.use('/locations', locations);
app.use('/items', items);

con.connect(err => {
    if (err) throw err;
    console.log("Connected!");
});

app.listen(port, () => {
    console.log('We are live in ' + port);
});