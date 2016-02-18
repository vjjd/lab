'use strict';

//Dependencies
let mongoose = require('mongoose');

let registration = new mongoose.Schema({
    username: 'string',
    password: 'string',
    email: 'string'});

let graphHistory = new mongoose.Schema({
    filename: {
        type: Array
    }
});

exports.users = mongoose.model('users', registration);
exports.history = mongoose.model('history', graphHistory);
