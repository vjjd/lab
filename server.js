'use strict';

//Dependencies
let config = require('./config');
let express = require('express');

//Variable
let app = express();

//Routes
require('./lib/routes')(app);

//Main
app.use(express.static('public'));
app.listen(config.port);