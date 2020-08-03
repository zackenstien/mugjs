"use strict"

const Route = require('../app/route');

Route.redirect('/search', 'https://google.com');

Route.get('/test', function() {
    if (!this.session.get('firstLoad')) {
        this.session.set('firstLoad', true);
        return `Hello, world!`;
    } else {
        return `Hello again, world!`;
    }
});