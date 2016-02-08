'use strict';

//Dependencies
let runRscript = require('./runRscript');
let makeRscript = require('./makeRscript');

//Variable
let fileName = '';

//Main
module.exports = (app, passport) => {

    //Get main
    app.get('/', (req, res) => {
        res.render('index', {exitCode: '1488', user: req.user});
    });

    //Make script
    app.post('/run',
        require('connect-ensure-login').ensureLoggedIn(),
        (req, res) => {
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
    app.get('/plot',
        require('connect-ensure-login').ensureLoggedIn(), (req, res) => {
        runRscript.run( (code) => {
            res.render('index', {exitCode: code, currFileName : './' + fileName, user: req.user});
        });
    });

    //If send without parameters
    app.get('/format',
        require('connect-ensure-login').ensureLoggedIn(),
        (req, res) => {
            res.render('index', {exitCode: '322', user: req.user});
        });

    //Passport part
    app.get('/login',
        (req, res) => {
            res.render('login');
        });

    app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }),
        (req, res) => {
            res.redirect('/');
        });

    app.get('/logout',
        (req, res) => {
            req.logout();
            res.redirect('/');
        });

    app.get('/profile',
        require('connect-ensure-login').ensureLoggedIn(), (req, res) => {
            res.render('profile', { user: req.user });
        });
};