'use strict';

//Ett exempel med kakor!

//npm install -g nodemon

//npm init

//npm install express
//npm install jsdom

//Ett mer omfattande exempel med lösningar för utmaningarna nedan hittar ni i cookieappsolution.js

const express = require( 'express' );
const jsDOM = require( 'jsdom' );
const fs = require( 'fs' );

const cookieParser = require('cookie-parser');

let app = express(); 

app.use( '/public', express.static( __dirname + '/static' ) );
app.use( express.urlencoded( { extended: true } ) );

app.use(cookieParser());

app.listen( 81, function() {
    console.log( 'Server is running on port 81!' );
    let oDate = new Date();
    console.log( oDate.toUTCString() );
});

app.get( '/', function(request, response) {
    
    console.log( request.query );
    response.sendFile( __dirname + '/static/html/index.html', function( error ) {
        if( error ) {
            response.status( 500 ).send( '500 Server error' );;
        } else {
            console.log( 'File has been sent!' );
        }
    });
    
});

app.get( '/merHamsterCom.html', function( request, response ) {

    /*
        Här får ni i uppgift att kontrllera om kakorna finns och om så är fallet läsa upp innehållet i
        merHamsterCom.html till en virtuell DOM och ändra bakgrundsfärg och förgrundsfärg enligt
        kakornas innehåll och avslutningsvis skicka tillbaka innehållet i den ändrade virtuella DOM:en
    */
	
    console.log( request.cookies,  request.cookies.fgcolor, request.cookies.bgcolor);
    console.log( request.query );
    fs.readFile( __dirname + '/static/html/merHamsterCom.html', function( error, data ) {

        if( error ) {
            response.status( 500 ).send( '500 Server error' );
        } else {
            let htmlCode = data;
            let serverDOM = new jsDOM.JSDOM( htmlCode );

            let bodyRef = serverDOM.window.document.querySelector( 'body' );
            let path = serverDOM.window.document;
            let h1Ref = path.createElement( 'h1' );
            let h1TextRef = path.createTextNode( 'h1' );

            h1Ref.appendChild(  h1TextRef );
            bodyRef.appendChild( h1Ref );
            htmlCode = serverDOM.serialize( serverDOM );
            response.send( htmlCode );
        }
    });
            
});

app.get( '/favicon.ico', function( request, response ) {

    console.log( request.query );
    response.sendFile( __dirname + '/static/image/favicon.ico', function( error ) {
        if( error ) {
            response.status( 500 ).send( '500 Server error' );
        } else {
            console.log( 'File has been sent!' );
        }
    });

});

app.post( '/', function(request, response) {

    console.log( request.body );

    //Här får ni i uppgift att kontrollera om kakorna finns eller inte. Finns kakorna gör redirekt
    //som nedan. Finns inte kakorna kontrollera att inkommande värden från formuläret 
    //inte har värdet '#ffffff' eller '#000000'. Om så är fallet exekvera koden med response.sendFile() 
    //nedan är kakorn. Innehåller inkommande värden korrekt data skapa kakorna och gör redirekt enligt nedan- 
    response.cookie('bgcolor', request.body.bgcolor);
    response.cookie('fgcolor', request.body.fgcolor);
    response.redirect('/merHamsterCom.html');

    /*

    response.sendFile( __dirname + '/static/html/merHamsterCom.html', function( error ) {
        if( error ) {
            response.status( 500 ).send( '500 Server error' );
        } else {
            console.log( 'File has been sent!' );
        }
    });
     
    */
});

app.use( function( request, response ) {
    console.log( request.query );
    response.status( 404 ).send( '404 File not found' );
});