'use strict';

let runRscript = require('./runRscript');
let makeRscript = require('./makeRscript');
let bodyParser = require("body-parser");

module.exports = (app) => {
    app.use(bodyParser.urlencoded({ extended: false }));

    app.get('/', (req, res) => {
        res.render('index', {exitCode: '1488'});
    });

    app.post('/run', (req, res) => {
        let params = req.body.plot_param;
        makeRscript.make(params, () => {
            res.send({redirect: '/plot'});
        });
    });

    app.get('/plot', (req, res) => {
        runRscript.run( (code) => {
            res.render('index', {exitCode: code});
        });
    });
};