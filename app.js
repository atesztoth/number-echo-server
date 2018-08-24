const debug = require('debug')('api:app');
const Koa = require('koa');
const app = new Koa();
const routes = require('./api/routes/routes');

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  debug(`${ctx.method} ${ctx.url} - ${rt}`);
});

app.use(routes);
module.exports = app;
