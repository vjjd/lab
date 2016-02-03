'use strict';

let rscript = require('../child_test');

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.redirect('./index.html');
    });

    app.get('/run', (req, res) => {
        rscript.run( (code) => {
            res.render('index', {exitCode: code});
        });
    });
};