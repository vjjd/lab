'use strict';

//Connect model
let mongoModels = require('./mongoModels');

//Search in db
exports.findById = (id, cb) => {
    mongoModels.users.findOne({_id: id})
        .exec((err, acc) => {
            if (err) handleError(err);
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
            if(err) return handleError(err);
            if (user) {
                if (user.username === username) {
                    return cb(null, user);
                }
            } else {
                return cb(null, null);
            }
    });
};

