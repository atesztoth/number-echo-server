const debug = require('debug')('app:controller:main');
const dataHandler = require('../data/handler');
const utils = require('../utils/utils');

module.exports = {
  answerer: answerer,
  sayHello: sayHello,
  infoResponse: infoResponse
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
 * Alerts the user about a wrongly called endpoint.
 * @param ctx
 * @returns {Promise<void>}
 */
async function infoResponse(ctx) {
  ctx.status = 400;
  ctx.body = utils.createErrorResponse(400, 'You\'ve given no number.');
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
    const { code, message } = e;
    ctx.status = code || 500;
    ctx.body = utils.createErrorResponse(code || 500, message);
  }
}

/**
 * Checks if given string contains integer value.
 * @param string
 */
function checkNumber(string) {
  const { maximumNumber } = dataHandler;
  if (!Number.isInteger(Number(string))) throw { code: 400, message: 'This was not a number.' };
  if (Number(string) < 0) throw { code: 400, message: 'Sorry, we only support numbers greater than 0.' };
  if (string.length > maximumNumber.length) // if it a longer length...
    throw { code: 400, message: 'Sorry, we only support numbers till ' + maximumNuber + '.' };
}