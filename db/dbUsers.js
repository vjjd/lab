'use strict';

//Connect model
let mongoModels = require('./mongoModels');

//Search in db
exports.findById = function(id, cb) {
    mongoModels.users.findOne({_id: id})
        .exec(function (err, acc) {
            if (err) handleError(err);
            if (acc) {
                cb(null, acc);
            } else {
                cb(new Error('User ' + id + ' does not exist'));
            }
        });
};

exports.findByUsername = function(username, cb) {
    mongoModels.users.findOne({username: username})
        .exec(function(err, acc) {
            if(err) return handleError(err);
            if (acc.username === username) {
                return cb(null, acc);
            } else {
                return cb(null, null);
            }
    });
};

