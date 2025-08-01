// node packages
const http = require('http');

// third party packages
const express = require('express');
const bodyParser = require('body-parser');

// my packages
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));

app.use(adminRoutes);
app.use(shopRoutes);

app.listen(3000);

