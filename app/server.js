// Import required modules.
const Route = require('./route');
const express = require('express');
const url = require('url');

/* Main Server API object */
let Server = {};

/* Express app object */
let app = express();

let executeController = (route, data, req, res) => {
    if (typeof route.controller == "function") {
        let response = route.controller.apply(undefined, data.slice(1));
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(response);
        res.end();
    }
}

/* Hosts the Sizzle project */
Server.start = (port) => {
    //console.log("TEST");
    app.all('*',(req, res) => {
        let reqUrl = url.parse(req.url);

        if (Route[`_${req.method.toLowerCase()}`] !== undefined) {
            //console.log("TEST");
            let catchall = null;
            let found = false;

            Route[`_${req.method.toLowerCase()}`].forEach(route => {
                if (!found) {
                    if (route.path == '*') {
                        catchall = route;
                        return;
                    }
                    //console.log(Route._get);
                    let data = reqUrl.pathname.match(route.match);
                    if (data) {
                        //console.log('INPUT', data);
                        found = true;
                        executeController(route, data, req, res);
                    }
                }
            });

            if (!found) {
                executeController(catchall, [], req, res);
            }
        }
    }).listen(port);
}

/* Expose API */
module.exports = Server;