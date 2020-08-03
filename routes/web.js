"use strict"

const Route = require('../app/route'),
      View = require('../template/view');

Route.redirect('/search', 'https://google.com');

Route.get('/test', function() {
    if (!this.session.get('firstLoad')) {
        this.session.set('firstLoad', true);
        return View('index', {
            user: "World!"
        });
    } else {
        return View('index', {
            user: "again, World!"
        });
    }
});