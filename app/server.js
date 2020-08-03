// Import required modules.
const Route = require('./route');
const http = require('http');
const url = require('url');

/* Main Server API object */
let Server = {};

/* Runs a controller */
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
    http.createServer((req, res) => {
        let reqUrl = url.parse(req.url);

        let redirectFound = false;
        let redirectCatchall = null;
        Route[`_redirect`].forEach(route => {
            /* Check if correct route has been found to save computer resources */
            if (!redirectFound) {
                /* Check if current Route object is a catchall */
                if (route.path == '*') {
                    /* If it is a catchall, save if for later (to save resources) */
                    redirectCatchall = route;
                    return;
                }
                /* Get the data from the regexp */
                let data = reqUrl.pathname.match(route.match);
                if (data) {
                    /* We've found the correct Route object!  Set found to true so we don't continue
                       searching and wasting resources. */
                    redirectFound = true;

                    /* Redirect */
                    res.writeHead(302, {
                        'Location': route.controller
                    });
                    res.end();
                }
            }
        });

        if (redirectCatchall !== null) {
            res.writeHead(302, {
                'Location': redirectCatchall.controller
            });
            res.end();

            return;
        }

        if ((!redirectFound) && Route[`_${req.method.toLowerCase()}`] !== undefined) {
            //console.log("TEST");
            let catchall = null;
            let found = false;

            /* Go through each route assigned to specified HTTP method */
            Route[`_${req.method.toLowerCase()}`].forEach(route => {
                /* Check if correct route has been found to save computer resources */
                if (!found) {
                    /* Check if current Route object is a catchall */
                    if (route.path == '*') {
                        /* If it is a catchall, save if for later (to save resources) */
                        catchall = route;
                        return;
                    }
                    /* Get the data from the regexp */
                    let data = reqUrl.pathname.match(route.match);
                    if (data) {
                        /* We've found the correct Route object!  Set found to true so we don't continue
                           searching and wasting resources. */
                        found = true;

                        /* Run the controller */
                        executeController(route, data, req, res);
                    }
                }
            });

            if ((!found) && catchall !== null) {
                /* If the route wasn't found, call the catchall controller. */
                executeController(catchall, [], req, res);
            }
        }
    }).listen(port); /* Listen at provided port. */
}

/* Expose API */
module.exports = Server;