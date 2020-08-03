const Route = require('../app/route');
const Server = require('../app/server');

Route.get('*', () => {
    return `Hello world!`;
});

Server.start(80);