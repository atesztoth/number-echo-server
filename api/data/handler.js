const translations = require('./translations');

module.exports = {
  translateNumber: translateNumber
};


/**
 * Translates a given number into a string.
 * @param number
 * @returns {string}
 */
function translateNumber(number) {
  const length = number.length;
  switch (length) {
    case 1:
      return translations.numberTranslations[Number(number)];
      break;
    default:
      return 'lol';
  }
}