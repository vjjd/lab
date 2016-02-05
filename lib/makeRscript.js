'use strict';

let fs = require('fs');
let start = `png('public/rplot.png')
`;
let end = `
dev.off()`;

function make (params, callback) {
    fs.writeFile("./lib/rscript.r", start + params + end, (err) => {
        if (err) return console.log(err);
        if (callback) callback(params.length)
    });
}

module.exports.make = make;
