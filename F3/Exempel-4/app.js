'use strict';

//GET & POST!
//npm install -g nodemon

//npm init
//npm install express
//npm install jsdom

const express = require('express');
const jsDOM = require('jsdom');
const fs = require('fs');

let app = express();

//Ett första middleware...
app.use('/public', express.static(__dirname + '/static'));
//Ett andra middleware...
app.use(express.urlencoded( {extended : true}));

//Lyssnar på port 81
app.listen(81, function() {
    console.log('Servern är igång!');
});

//GET på /
app.get('/', function(request, response){
    console.log('En utskrift från get...');
    response.sendFile(__dirname + '/static/html/index.html');
});

//POST på /
app.post('/', function(request, response) {
    console.log('En utskrift från post...');
    console.log( request.body.nickname );
    //response.sendFile(__dirname + '/static/html/index.html');

    fs.readFile(__dirname + '/static/html/index.html', function(error, data) {

        if( error ){
            console.log('Något gick fel...'); //Kanske något att fixa till för er...
        } else {
            //console.log( data.toString() );

            //Ngt att fixa är kontrollen för att det finns ngt i nickname...

            let htmlCode = data;

            let serverDOM = new jsDOM.JSDOM( htmlCode );
            let mainNodeRef = serverDOM.window.document.querySelector('main');

            let h1Ref = serverDOM.window.document.createElement('h1');
            let textH1Ref = serverDOM.window.document.createTextNode(request.body.nickname);

            h1Ref.appendChild( textH1Ref );
            mainNodeRef.appendChild( h1Ref );

            htmlCode = serverDOM.serialize();
            response.send( htmlCode );

        }
    });
});