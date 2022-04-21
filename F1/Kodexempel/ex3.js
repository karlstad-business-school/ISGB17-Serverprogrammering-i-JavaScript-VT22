'use strict';
const fs = require('fs');
const http = require('http');
//
const uc = require('upper-case');

http.createServer(function(req,res) {
    
    let content = fs.readFileSync('minHtmlFil.html').toString();
    content = uc.upperCase(content);
    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.end(content);
}).listen(3001);
