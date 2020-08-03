// Load routes
const webRoutes = require('./routes/web');

// Start the web server
const Server = require('./app/server');
Server.start(80);