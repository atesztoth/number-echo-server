const debug = require('debug')('app:Server');
const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
debug('Application is listening on port: ' + PORT);
app.listen(PORT);