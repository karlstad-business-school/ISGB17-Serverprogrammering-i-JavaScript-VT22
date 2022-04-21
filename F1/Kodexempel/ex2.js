'use strict';

//Andra programmet, lyssnare

//Import av inbyggda kodbibliotek
const fs = require('fs');

let filnamn = 'test.txt';

fs.stat(filnamn, function(err, stats) {
    if(err) {
        err.message='Filen finns inte';
        return console.error(err);
    }
    else {
        console.log('Lägger på lyssnare...');
        fs.watch(filnamn, function() {
            //console.log('filen har ändrats...');
            let filinnehall = fs.readFileSync(filnamn).toString();
            console.log(filinnehall);
        });
    }
});