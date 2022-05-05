'use strict';
const socket = io();

window.addEventListener('load', ()=> {
    document.querySelector('.btn').addEventListener('click', banan);
});

function banan() {
    socket.emit('rndcol', 'klickad...');
}

socket.on('changeBackGroundColor', function(data) {
    let body = document.querySelector('body');

    body.setAttribute('style', 'background-color: rgb(' + data.red + ',' + data.green + ',' + data.blue +');');
});
