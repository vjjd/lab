'use strict';

let runRscript = require('./runRscript');
let makeRscript = require('./makeRscript');
let bodyParser = require("body-parser");
let fileName = '';

module.exports = (app) => {
    app.use(bodyParser.urlencoded({ extended: false }));

    app.get('/', (req, res) => {
        res.render('index', {exitCode: '1488'});
    });

    app.post('/run', (req, res) => {
        let params = req.body.plot_param;
        if (params.length != 0) {
            makeRscript.make(params, (fN) => {
                fileName = fN;
                res.send({redirect: '/plot'});
            });
        } else {
            res.send({render: '/format'});
        }
    });

    app.get('/plot', (req, res) => {
        runRscript.run( (code) => {
            res.render('index', {exitCode: code, currFileName : './' + fileName});
        });
    });

    app.get('/format', (req, res) => {
       res.render('index', {exitCode: '322'});
    });
};