'use strict';

//Dependencies
let fs = require('fs');
let lib = require('../lib');

//Part of R script
let start = 'png(\'public/';
let tab = '\')\n';
let end = '\n dev.off()';

//Making script
exports.make = (params, callback) => {
    //File naming
    let fileName = lib.genID.generate();

    fs.writeFile("./lib/rscript.r", start + fileName + tab + params + end, (err) => {
        if (err) return console.log(err);
        if (callback) callback(fileName);
    });
};