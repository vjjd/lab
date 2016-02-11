'use strict';

//Dependencies
let mongoose = require('mongoose');
let registration = new mongoose.Schema({username: 'string', password: 'string'});

exports.users = mongoose.model('users', registration);
