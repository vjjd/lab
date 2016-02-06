'use strict';

let genID = require('./genID');
let fs = require('fs');
let start = 'png(\'public/';
let tab = '\')\n';
let end = '\n dev.off()';

function make (params, callback) {
    let fileName = genID.generate();
    fs.writeFile("./lib/rscript.r", start + fileName + tab + params + end, (err) => {
        if (err) return console.log(err);
        if (callback) callback(fileName);
    });
}

module.exports.make = make;