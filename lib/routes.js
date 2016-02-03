'use strict';

let rscript = require('../child_test');

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.redirect('/index.html');
    });

    app.get('/run', (req, res) => {
        rscript.run( () => {
            res.redirect('/rplot.png');
        });
    });
};