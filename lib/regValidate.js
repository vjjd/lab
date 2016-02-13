'use strict';

let validator = require('validator');

exports.validate = (form, callback) => {
    if (validator.isLength(form.username, {min:5, max: 32}) === true &&
        validator.isLength(form.password, {min:5, max: 32}) === true &&
        validator.isLength(form.email, {min:5, max: 32}) === true &&
        validator.isEmail(form.email, {allow_utf8_local_part: false}) === true)
    {
        callback(true);
    } else {
        callback(false);
    }
};