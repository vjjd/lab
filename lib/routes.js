'use strict';

let rscript = require('../child_test');

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.render('index');
    });

    app.get('/run', (req, res) => {
        rscript.run();
        res.redirect('/');
    });
};