const debug = require('debug')('api:app');
const Koa = require('koa');
const logger = require('koa-logger');
const app = new Koa();
const routes = require('./api/routes/routes');

app.use(logger());

app.use(routes);
module.exports = app;
