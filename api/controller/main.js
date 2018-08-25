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
    checkNumber(number);
    const result = dataHandler.translateNumber(number);
    ctx.status = 200;
    ctx.body = { result };
  } catch (e) {
    debug(e);
    const code = e.code || 500;
    ctx.status = code;
    ctx.body = utils.createErrorResponse(code, e.message);
  }
}

/**
 * Checks if given string contains integer value.
 * @param string
 */
function checkNumber(string) {
  if (!Number.isInteger(Number(string))) throw { code: 400, message: 'This was not a number.' };
  if (Number(string) > 9999) throw { code: 400, message: 'Sorry, we only support numbers till 9999.' };
}