const Route = require('../app/route'),
      View = require('../template/view');

Route.get('/', function() {
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