'use strict';

//Dependencies
let Strategy = require('passport-local').Strategy;
let db = require('../db');

// Configure the local strategy for use by Passport.
module.exports = (passport) => {
    passport.use(new Strategy(
        (username, password, cb) => {
            db.users.findByUsername(username, (err, user) => {
                if (err) { return cb(err); }
                if (!user) { return cb(null, false); }
                if (user.password != password) { return cb(null, false); }
                return cb(null, user);
            });
        }));

    // Configure Passport authenticated session persistence.
    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    });

    passport.deserializeUser((id, cb) => {
        db.users.findById(id, (err, user) => {
            if (err) { return cb(err); }
            cb(null, user);
        });
    });
};