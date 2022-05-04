'use strict';

const express = require('express');
const cookieParser = require('cookie-parser'); 
const jsDOM = require('jsdom');

const fs = require('fs');

let app = express(); 

app.use('/public', express.static(__dirname + '/static'));
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser('Hemligt'));

app.listen(81, function() {
    console.log('Server is running on port 81!');
    let oDate = new Date();
    console.log( oDate.toUTCString() );
});

app.get('/merHamsterCom.html', function(request, response) {

    console.table( request.signedCookies );

	//Om kakorna finns
    if(request.signedCookies.fgcolor !== undefined && request.signedCookies.bgcolor !== undefined) { 
        
		//Om action finns och är lika med delete tabort kakorna och gör redirect
        if(request.query.action !== undefined && request.query.action === 'delete') {
            console.table( request.query );
            response.clearCookie('bgcolor');
            response.clearCookie('fgcolor');
            response.redirect('/');

        } else { //annars läs upp filen och gör ändring och skicka till klienten

            fs.readFile(__dirname + '/static/html/merHamsterCom.html', function(error, data) {

                if(error) {
                    response.status(500).send('500 Server error');
                    console.table(error);
                } else {
                    let htmlCode = data;
                    let serverDOM = new jsDOM.JSDOM(htmlCode);

                    let bodyRef = serverDOM.window.document.querySelector('body');
                    bodyRef.style.backgroundColor=  request.signedCookies.bgcolor;
                    bodyRef.style.color =  request.signedCookies.fgcolor;

                    htmlCode = serverDOM.serialize(serverDOM);
                    response.send(htmlCode);
                }
            });
            
        }
    } else {
        response.redirect('/'); //Inga kakor gör redirect
    }

});

app.get('/', function(request, response) {
    
    console.table( request.signedCookies );

	//Kommer kakorna till servern gör redirect
     if(request.signedCookies.fgcolor !== undefined && request.signedCookies.bgcolor !== undefined) {
        response.redirect('/merHamsterCom.html');
     } else {
        response.sendFile(__dirname + '/static/html/index.html', function(error) {
            if(error) {
                response.status(500).send('500 Server error');
                console.table(error);
            } else {
                console.log('File has been sent!');
            }
        });
     }
    
});

app.post('/', function(request, response) {

    console.table( request.signedCookies );
    console.table( request.body );

	//Kommer kakorna till servern gör redirect
    if(request.signedCookies.fgcolor !== undefined && request.signedCookies.bgcolor !== undefined) {
        response.redirect('/merHamsterCom.html');       
    } 
    else if(request.body.fgcolor!== '#000000' && //om indata är korrekt skapa kakor och gör redirect
        request.body.fgcolor !== '#ffffff' && 
        request.body.bgcolor!== '#000000' && 
        request.body.bgcolor !== '#ffffff') {

            response.cookie('bgcolor', request.body.bgcolor, {maxAge : 1000 * 60 * 60, httpOnly : true, signed : true, } );
            response.cookie('fgcolor', request.body.fgcolor, {maxAge : 1000 * 60 * 60, httpOnly : true, signed : true} );
            response.redirect('/merHamsterCom.html');

    } else { //Annars skicka index.html
        response.sendFile(__dirname + '/static/html/index.html', function(error) {
            if(error) {
                response.status(500).send('500 Server error');
                console.table(error);
            } else {
                console.log('File has been sent!');
            }
        });
     }

});

app.get('/favicon.ico', function(request, response ) {
    console.table( [request.url, request.method] );
    response.sendFile(__dirname + '/static/image/favicon.ico');
});

app.use(function( request, response ) {
    console.table( [request.url, request.method] );
    response.status(404).send('404 File not found');
});