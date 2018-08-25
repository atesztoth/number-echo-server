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
  let translation;
  switch (length) {
    case 1:
      translation = translations.numberTranslations[Number(number)];
      break;
    case 2:
      translation = translateSpecial(number);
      break;
    default:
      translation = baseTranslationLogic(number);
  }

  if (!translation) throw 'Could not translate ' + number;
  return translation;
}

/**
 * Translates two letter long strings, that can contain special cases.
 * @param string
 */
function translateSpecial(string) {
  if (string.length !== 2) throw 'Invalid string!';

  const { specialNumbers, numberTranslations } = translations;
  const asNumber = Number(string);

  if (Object.keys(specialNumbers).includes(string)) return specialNumbers[asNumber];

  const firstNumber = string[0];
  const secondNumber = string[1];

  if (firstNumber === '1') return numberTranslations[Number(secondNumber)] + 'teen';

  const tyTranslation = (numberTranslations[Number(firstNumber)] + 'ty').replace('tt', 't');
  if (secondNumber === '0') {
    return tyTranslation;
  } else {
    return tyTranslation + '-' + numberTranslations[Number(secondNumber)];
  }
}

/**
 * Translation logic for handling bigger numbers.
 * @param string
 * @returns {string}
 */
function baseTranslationLogic(string) {
  return 'no no no! git commit first!';
}