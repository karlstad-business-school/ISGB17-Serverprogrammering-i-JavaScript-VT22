'use strict';

exports.mySimpleWebServer = function() {

    const http = require('http');
    const fs = require('fs');

    http.createServer(function(req,res) {

        let filnamn;

        if(req.url==='/') {
            //Läs in index
            filnamn = 'index.html';
        }
        else {
            filnamn = req.url;
            filnamn = filnamn.substring(1);
        }

        fs.stat(filnamn, function(err,stats) {
            if(err) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.end();
            }
            else {
                let content = fs.readFileSync(filnamn).toString();
                //skdgfsdkhf
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(content);
                res.end();
            }
        });


    }).listen(3001);

}