const Route = require('./app/route');
const Server = require('./app/server')
//const { Route, Server, View } = require('sizzle');

Route.get('*', () => {
    return `404 Not Found.  If you believe that this is an error, please contact the website admin.`;
});

Route.get('/hello/:name', (name) => {
    if (name.toLowerCase() == "world") {
        return `Please go to '/helloworld'.`
    }
    return `Hello, ${name}!`;
});

Route.get('/helloworld', () => {
    return `Hello, World!`
})

//console.log(Route._get[0].regex.keys)

Server.start(80);