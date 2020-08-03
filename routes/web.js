const Route = require('../app/route');

Route.get('/', () => {
    return `Hello, world!`;
});

Route.get('*', () => {
    return `404 Not Found :(`;
});