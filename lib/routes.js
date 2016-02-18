'use strict';

//Dependencies
let lib = require('../lib');
let db = require('../db');
let config = require('../config');
let ensureLogIn = require('connect-ensure-login').ensureLoggedIn();

//Variable
let fileName = '';

//Main
module.exports = (app, passport) => {

    //Get main
    app.get('/', (req, res) => {
        console.log(req.user);
        res.render('index', {exitCode: '1488', user: req.user});
    });

    //Make script
    app.post('/run',
        ensureLogIn,
        (req, res) => {
            let params = req.body.plot_param;
            if (params.length != 0) {
                lib.makeRscript.make(params, (fN) => {
                    fileName = fN;
                    res.send({redirect: '/plot'});
                });
            } else {
                res.send({render: '/format'});
            }
        });

    //Run script and show graph
    app.get('/plot',
        ensureLogIn, (req, res) => {
        lib.runRscript.run( (code) => {
            db.history.makeHistory(req.user.id, fileName, (fName) => {
                console.log('sohraneno:' + fName);
            });
            res.render('index', {exitCode: code, currFileName : './' + fileName, user: req.user});
        });
    });

    //If send without parameters
    app.get('/format',
        ensureLogIn,
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
        ensureLogIn, (req, res) => {
            res.render('profile', { user: req.user });
        });

    //Registration
    app.get('/reg',
        (req, res) => {
           res.render('reg', {exitCode: config.exitCode.begin});
        });

    app.post('/reg',
        (req, res) => {
            let form = req.body;
            lib.regValidate.validate(form, (cb) => {
                if (cb === true) {
                    db.reg.createNewAcc(form, (username, email) => {
                        if (form.username === username || form.email === email) {
                            res.render('reg', {exitCode: config.exitCode.ok});
                        } else {
                            res.render('reg', {exitCode: config.exitCode.reiteration});
                        }
                    });
                } else {
                    res.render('reg', {exitCode: config.exitCode.notValid});
                }
            });
        });

    //History
    app.get('/history',
        ensureLogIn,
        (req, res) => {
            db.users.findHistory(req.user.id, (err, filename) => {
                    res.render('history', {history: filename});
            });
        });
};