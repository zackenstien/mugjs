const Route = require('../app/route');

Route.redirect('/search', 'https://google.com');

Route.get('/test', () => {
    return `Hello, world!`;
});