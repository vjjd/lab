'use strict';

let config = require('./config');
let express = require('express');
let rscript = require('./child_test');

let app = express();

require('./lib/routes')(app, rscript);

app.set('view engine', 'ejs');
app.listen(config.port);