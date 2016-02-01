'use strict';

let fs = require('fs');
let rows = fs.readFileSync('rows.txt').toString().split('\n');
let f = n => n ? n * f(n - 1) : 1;
let nop =  f(rows.length)/(f(rows.length-2)*2);

console.log('number_of_pairs: ', nop);

rows.reduce( (previousValue, currentItem, i, arr) => {
    for(i+1; i < arr.length - 1; i++) {
        let pair = currentItem + arr[i+1];
        console.log(pair);
    }
}, 0);
