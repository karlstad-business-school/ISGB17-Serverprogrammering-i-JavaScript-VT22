'use strict';
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

http.listen(3001,function() {
    console.log('Server is now running...');
});

app.get('/', function(req,res) {
    console.log('Vi har ett anrop!');
    res.sendFile(__dirname + '/index.html');
});

app.get('/favicon.ico', function(req,res) {
    console.log('FAV!');
    res.sendFile(__dirname + '/favicon.ico');
});

app.use('/clientscripts', express.static(__dirname + '/clientscripts'));


io.on('connection', (socket) => {
    console.log('Ny användare anslöt via socket...');

    socket.on('rndcol', slumpaNyFarg);


});

function slumpaNyFarg(msg) {
    let r = Math.floor(Math.random()*256);
    let g = Math.floor(Math.random()*256);
    let b = Math.floor(Math.random()*256);

    io.emit('changeBackGroundColor', {
        'red': r,
        'green': g,
        'blue': b
    });
}

