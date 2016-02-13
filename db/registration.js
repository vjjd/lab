'use strict';

//Connect model
let mongoose = require('mongoose');
let mongoModels = require('./mongoModels');
let db = require('../db');

exports.createNewAcc = function (form, cb) {
    db.users.findByUsername(form.username, (err, user) => {
        if (err) throw err;
        if (user) {return cb(null)}
        if (!user) {
            db.users.findByEmail(form.email, (err, email) => {
                if (err) throw err;
                if (email) {return cb(null)}
                if (!email) {
                    let regUser = new mongoModels.users({
                        username: form.username,
                        password: form.password,
                        email: form.email
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