const express = require('express');
const cors = require('cors');

const items = require('./app/items');
const categories = require('./app/categories');
const locations = require('./app/locations');

const mysqlDb = require('./mysqlDb');

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.use('/categories', categories);
app.use('/locations', locations);
app.use('/items', items);

app.use(express.static('public'));

mysqlDb.connect().catch(e => console.log(e));

app.listen(port, () => {
    console.log('We are live in ' + port);
});