'use strict';

//Connect model
let mongoModels = require('./mongoModels');

//Search in db
exports.findById = (id, cb) => {
    mongoModels.users.findOne({_id: id})
        .exec((err, acc) => {
            if (err) throw (err);
            if (acc) {
                cb(null, acc);
            } else {
                cb(new Error('User ' + id + ' does not exist'));
            }
        });
};

exports.findByUsername = (username, cb) => {
    mongoModels.users.findOne({username: username})
        .exec((err, user) => {
            if(err) throw (err);
            if (user) {
                if (user.username === username) {
                    return cb(null, user);
                }
            } else {
                return cb(null, null);
            }
    });
};

exports.findByEmail = (email, cb) => {
    mongoModels.users.findOne({email: email})
        .exec((err, email) => {
            if(err) throw (err);
            if (email) {
                if (user.email === email) {
                    return cb(null, email);
                }
            } else {
                return cb(null, null);
            }
        });
};

exports.findHistory = (id, cb) => {
    mongoModels.history.findOne({_id: id})
        .exec((err, acc) => {
            if (err) throw (err);
            if (acc) {
                return cb (null, acc.filename);
            } else {
            return cb (null, null);
            }
        });
};
