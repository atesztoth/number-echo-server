const debug = require('debug')('api:Server');
const app = require('./app');
const PORT = process.env.PORT || 3000;

app.listen(PORT);

debug('Application is listening on port: ' + PORT);