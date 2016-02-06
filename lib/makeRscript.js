'use strict';

//Dependencies
let genID = require('./genID');
let fs = require('fs');

//Part of R script
let start = 'png(\'public/';
let tab = '\')\n';
let end = '\n dev.off()';

//Making script
function make (params, callback) {
    //File naming
    let fileName = genID.generate();
    fs.writeFile("./lib/rscript.r", start + fileName + tab + params + end, (err) => {
        if (err) return console.log(err);
        if (callback) callback(fileName);
    });
}

module.exports.make = make;