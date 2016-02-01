'use strict';

let config = require('./config');
let express = require('express');
let r = require('./child_test.js');
let app = express();

app.get('/', (req, res) => {
    res.render('index', {r: r.script()});
});

app.set('view engine', 'ejs');
app.listen(config.port);