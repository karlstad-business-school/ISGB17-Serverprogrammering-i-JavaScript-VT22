'use strict';

window.addEventListener('DOMContentLoaded', function() {

    let oDate = new Date();
    let debugState = true;

    console.log( oDate.toUTCString() );

    if(window.document.cookie.length === 0) {
        console.log('Inga kakor att accessa via klient JS!');
    } else {
        console.log('Cookies: ', window.document.cookie);
    }

    //Gäller bara index.html därav kontroll av elementets existens!
    if(debugState && window.document.querySelector('#backgroundcolor') !== null) {
        //Inte synligt i Inspector
        window.document.querySelector('#backgroundcolor').value = '#0080ff';
        console.log(window.document.querySelector('#backgroundcolor').value);

        //Synligt i Inspector
        window.document.querySelector('#textcolor').setAttribute('value', '#ff0080');
    }

    console.table(window.localStorage);
    console.table(window.sessionStorage);
    console.table(window.indexedDB);
    //let dbConn = window.indexedDB.open('demo', 1.0);


    console.table(window.document.cookie);
    
    if(  window.document.querySelector('[type=submit]') !== null) {
        

        window.document.querySelector('form').addEventListener('submit', function(e) {

            window.localStorage.setItem('bgcolor', window.document.querySelector('#backgroundcolor').value);
            window.localStorage.setItem('fgcolor', window.document.querySelector('#textcolor').value);

            window.sessionStorage.setItem('bgcolor', window.document.querySelector('#backgroundcolor').value);
            window.sessionStorage.setItem('fgcolor', window.document.querySelector('#textcolor').value);

        });
    }
    
});