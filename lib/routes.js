'use strict';

//Dependencies
let runRscript = require('./runRscript');
let makeRscript = require('./makeRscript');
let db = require('../db');
let config = require('../config');
let validator = require('validator');

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
            res.render('index', {exitCode: config.exitCode.format, user: req.user});
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

    //Registration
    app.get('/reg',
        (req, res) => {
           res.render('reg', {exitCode: config.exitCode.begin});
        });

    app.post('/reg',
        (req, res) => {
            let user = req.body.username;
            let pass = req.body.password;
            let email = req.body.email;

            if (validator.isLength(user, {min:5, max: 32}) === true &&
                validator.isLength(pass, {min:5, max: 32}) === true &&
                validator.isLength(email, {min:5, max: 32}) === true &&
                validator.isEmail(email, {allow_utf8_local_part: false}) === true)
            {
                db.reg.createNewAcc(user, pass, email, (username, mail) => {
                    if (user === username || email === mail) {
                        res.render('reg', {exitCode: config.exitCode.ok});
                    } else {
                        res.render('reg', {exitCode: config.exitCode.reiteration});
                    }
                });
            } else {
                res.render('reg', {exitCode: config.exitCode.notValid});
            }
        });
};