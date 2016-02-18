'use strict';

//Connect model
let mongoose = require('mongoose');
let mongoModels = require('./mongoModels');

exports.makeHistory = function (id, fNames, cb) {
    mongoModels.history.findByIdAndUpdate(
        id,
        {$push: {"filename": fNames}},
        {safe: true, upsert: true, new : true},
        function(err, newHistory) {
            if (err) throw (err);
            if(newHistory) cb(newHistory.filename)
        }
    );
};