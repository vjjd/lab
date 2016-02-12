'use strict';

//Connect model
let mongoose = require('mongoose');
let mongoModels = require('./mongoModels');
let db = require('../db');

exports.createNewAcc = function (username, password, email, cb) {
    db.users.findByUsername(username, (err, user) => {
        if (err) throw err;
        if (user) {return cb(null)}
        if (!user) {
            db.users.findByEmail(email, (err, mail) => {
                if (err) throw err;
                if (mail) {return cb(null)}
                if (!mail) {
                    let regUser = new mongoModels.users({
                        username: username,
                        password: password,
                        email: email
                    });
                    regUser.save(function (err, newUser) {
                        if (err) throw (err);
                        if (newUser) cb(newUser.username, newUser.email);
                    });
                }
            });
        }
    });
};