const Koa = require('koa');
const logger = require('koa-logger');
const app = new Koa();
const routes = require('./api/routes/routes');

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  await next();
});

app.use(logger());

app.use(routes);

module.exports = app;
