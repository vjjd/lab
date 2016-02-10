'use strict';

let config = require('../config');
let mongoose = require('mongoose');

mongoose.connect(config.db);
let db = mongoose.connection;

module.exports = db;