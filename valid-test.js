'use strict';

let validator = require('validator');

let form = {
    username: 'manya',
    password: 'amahasla',
    email: 'sooqa@gmail.com'
};

console.log(form.username, form.email, form.password);
//validate = (form, callback) => {
//        if(
//            validator.isLength(value, {min:5, max: 32}) === true &&
//            validator.isEmail(form.email, {allow_utf8_local_part: false}) === true)
//        {
//            callback(true);
//        } else {
//            callback(false);
//        }
//    };



