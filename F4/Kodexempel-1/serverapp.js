'use strict';

const express = require('express');

let app = express(); 

app.listen( 81, function() {
    console.log( 'Server is running on port 81!' );
});

app.get( '/', function( request, response ) {
    console.log( request.method );
    response.sendFile( __dirname + '/static/html/index.html' );
});
