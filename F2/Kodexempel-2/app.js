'use strict';
const fs = require('fs');


replace().then(function(returvarde) {
    console.log('Alles gut!');
});

console.log('kör på utan blockering...');





async function replace() {
    console.log('öppnar fil...');
    let megaFil = await fs.readFileSync('stor-fil.txt').toString();
    console.log('inläsning klar');
    console.log('startar beräkningar');
    for(let i=0; i<500;i++) {

        for(let j=0; j<megaFil.length;j++) {
            if(megaFil[j]=='a') {
                //megaFil[j]='y';
            }
        }
    }

    console.log('Beräkning klar!');
    return Promise.resolve('allt gick fint');
}
