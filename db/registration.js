'use strict';

//Connect model
let mongoose = require('mongoose');
let mongoModels = require('./mongoModels');
let db = require('../db');

exports.createNewAcc = function (username, password, cb) {
    db.users.findByUsername(username, (err, user) => {
        if (err) throw err;
        if (user) {return cb(null)}
        if (!user) {
            let regUser = new mongoModels.users({
                username: username,
                password: password
            });

            regUser.save(function (err, newUser) {
                    if (err) throw (err);
                    if (newUser) cb(newUser.username);
                });
        }
    });
};