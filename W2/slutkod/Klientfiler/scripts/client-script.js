'use strict';
let socket = io();

window.addEventListener('load', ()=>{
    let buttons = document.querySelectorAll('.birdbutton');

    buttons.forEach((button) => {
        button.addEventListener('click', sendNewBackGroundImage);
    });
});

function sendNewBackGroundImage(evt) {
    evt.preventDefault();

    socket.emit('newBackGround', {"backgroundid": evt.target.getAttribute('data-birdid')});
}

socket.on('bytbild', function(data) {
    let body = document.querySelector('body');
    body.setAttribute('style','background-image: url("public/images/' + data.imageid + '.jpg");background-size: cover;');

});
