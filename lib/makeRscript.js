'use strict';

let fs = require('fs');
let ending = `
png('public/rplot.png')
plot(x,y)
dev.off()`;

function make (params, callback) {
    fs.writeFile("./lib/rscript.r", params + ending, (err) => {
        if (err) return console.log(err);
        if (callback) callback()
    });
}

module.exports.make = make;