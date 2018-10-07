const debug = require('debug')('app:controller:main');
const dataHandler = require('../data/handler');
const utils = require('../utils/utils');
const fs = require('fs');

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
  ctx.headers['Content-Type'] = 'text/html; charset=utf-8';
  const content = fs.readFileSync(`${__dirname}/../info/api-description.html`, 'utf-16le');
  ctx.body = content.toString();
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
  if (Number(string) < 0) throw { code: 400, message: 'Sorry, we only support numbers greater than 0.' };
}