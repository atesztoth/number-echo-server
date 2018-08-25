const debug = require('debug')('app:controller:main');
const dataHandler = require('../data/handler');
const utils = require('../utils/utils');

module.exports = {
  answerer: answerer,
  sayHello: sayHello
};

/**
 * Says hello!
 * @param ctx
 * @returns {Promise<*|void|Promise<any>>}
 */
async function sayHello(ctx) {
  ctx.status = 200;
  ctx.body = { message: 'Hello' };
}

/**
 * Answers incoming requests.
 * @param ctx
 * @returns {Promise<*|void|Promise<any>>}
 */
async function answerer(ctx) {
  try {
    const { params: { number } } = ctx;
    const result = dataHandler.translateNumber(number);
    ctx.status = 200;
    ctx.body = { result: 'one' };
  } catch (e) {
    ctx.status = 500;
    ctx.body = utils.createErrorResponse(500, e.message);
  }
}