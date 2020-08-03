const Route = require('../app/route');

Route.redirect('/', '/test');

Route.get('*', () => {
    return `404 Not Found :(`;
});