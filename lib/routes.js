'use strict';

//Dependencies
let runRscript = require('./runRscript');
let makeRscript = require('./makeRscript');
let bodyParser = require("body-parser");

//Variable
let fileName = '';

//Main
module.exports = (app) => {
    //Parser
    app.use(bodyParser.urlencoded({ extended: false }));

    //Start
    app.get('/', (req, res) => {
        res.render('index', {exitCode: '1488'});
    });

    //Make script
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

    //Run script and show graph
    app.get('/plot', (req, res) => {
        runRscript.run( (code) => {
            res.render('index', {exitCode: code, currFileName : './' + fileName});
        });
    });

    //If send without parameters
    app.get('/format', (req, res) => {
       res.render('index', {exitCode: '322'});
    });
};