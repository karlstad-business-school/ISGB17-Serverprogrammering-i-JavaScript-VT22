'use strict';

//Simple http client 
//Inspired by https://nodejs.dev/making-http-requests-with-nodejs

/*
  Inkludera http
  Skapa objektet options (ett object literal)
  Anropa request med options och callback function
  Lyssna för data på response
  Lyssna för error på request
  Avsluta request

*/

const http = require('http');

const options = {
  hostname : 'localhost',
  port : 81,
  path : '/',
  method : 'GET'
};

const request = http.request( options, function( response ) {

  response.on( 'data', function( data) {
      console.log( data.toString() );
  });

});

request.end();

