/* Load dependencies */
const pathToRegexp = require("path-to-regexp");

/* Main Route object. */
let Route = {};

/* Route method generator */
let createHttpMethod = (method) => {
    let property = `_${method}`;
    Route[property] = [];

    return (path, controller) => {
        Route[property].push({
            controller,
            path,
            match: pathToRegexp(path)
        });
    }
}

/* Implement HTTP Methods */
Route.get = createHttpMethod('get');
Route.post = createHttpMethod('post');
Route.put = createHttpMethod('put');
Route.patch = createHttpMethod('patch');
Route.delete = createHttpMethod('delete');
Route.options = createHttpMethod('options');
Route.redirect = createHttpMethod('redirect');

/* Adds a route to multiple HTTP Methods */
Route.match = (methods, path, controller) => {
    methods.forEach(method => {
        Route[method](path, controller);
    });
}

/* Adds a route to all HTTP Methods */
Route.all = (path, controller) => {
    Object.keys(Route).forEach(httpMethod => {
        if (httpMethod[0] == '_' && httpMethod !== '_redirect') {
            Route[httpMethod].push({
                controller,
                path,
                match: pathToRegexp(path)
            });
        }
    });
}

/* Expose API */
module.exports = Route;