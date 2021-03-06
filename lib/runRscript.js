'use strict';

//Running R script
exports.run = (callback) => {
    const spawn = require('child_process').spawn;
    const r = spawn('Rscript', ['./lib/rscript.r']);

    r.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    r.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    });

    r.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        if (callback) callback(code);
    });
};