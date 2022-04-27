'use strict';

// DOMConenteLoaded vs. load
window.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded');

    let imgRefs = window.document.querySelectorAll('img');
    console.log(imgRefs);

    for(let i = 0; i < imgRefs.length; i++) {
        let imgRef = imgRefs.item(i);

        console.log(imgRef);

        imgRef.style.width = '10%';
        imgRef.style.height = '10%';
    }

});