require('../utils/stringUtils');
const translations = require('./translations');
const { postFixes } = translations;

module.exports = {
  translateNumber: translateNumber,
  maximumNumber: "999999999999"
};

const DEFAULTS = {
  HUNDRED: 'hundred'
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
    case 2:
      translation = translateSpecial(number);
      break;
    case 3:
      translation = baseTranslationLogic(number);
      break;
    default:
      translation = magic(number);
  }

  if (!translation) throw 'Could not translate ' + number;
  return translation;
}

/**
 * Translates two letter long strings, that can contain special cases.
 * @param string
 */
function translateSpecial(string) {
  if (string.length === 1) return translations.numberTranslations[Number(string)];
  if (string.length !== 2) throw 'Invalid string!';
  if (string === '00') return ''; // special case

  const { specialNumbers, numberTranslations } = translations;
  const asNumber = Number(string);
  const firstNumber = string[0];
  const secondNumber = string[1];
  const specialNumberTranslator = tenGroup =>
    specialNumbers[Number(tenGroup)] + (secondNumber === '0' ? '' : '-' + numberTranslations[Number(secondNumber)]);

  if (firstNumber === '0') return numberTranslations[Number(secondNumber)];

  if (Object.keys(specialNumbers).includes(string)) return specialNumbers[asNumber];

  switch (firstNumber) {
    case '1':
      return numberTranslations[Number(secondNumber)] + 'teen';
    case '2':
      return specialNumberTranslator(20);
    case '3':
      return specialNumberTranslator(30);
    case '5':
      return specialNumberTranslator(50);
    default:
      break;
  }

  const tyTranslation = (numberTranslations[Number(firstNumber)] + 'ty').replace('tt', 't');
  if (secondNumber === '0') return tyTranslation;

  return tyTranslation + '-' + numberTranslations[Number(secondNumber)];
}

/**
 * Translation logic for handling bigger numbers.
 * @param string
 * @returns {string}
 */
function baseTranslationLogic(string) {
  let output = '';
  output += string.length === 3 ? translateNumber(string[0]) + ' ' + DEFAULTS.HUNDRED : '';
  const lastTwo = string.slice(-2);
  output += lastTwo !== '00' ? ' and ' + translateSpecial(lastTwo) : '';

  return output.trim();
}

// Lets get a bit tricky.
/**
 * Does the magic.
 * Fortunately these bigger numbers "behave", so above the hundreds,
 * we are all cool. Lets use some recursion for this.
 * @param number
 * @param currentPosition
 * @return string
 */
function magic(number, currentPosition) {
  if (!number) return '';
  const usablePosition = typeof currentPosition === 'undefined' ? number.length - 1 : currentPosition;
  const { position, result } = magicanAssistant(number, usablePosition);

  if (result === '') return '';
  const postFix = currentPosition > 3 ? postFixes[currentPosition % 3] : '';
  return baseTranslationLogic(result) + ' ' + postFix + ' ' + magic(number, position);
}

/**
 * Returns a substring based on the position and
 * @param number
 * @param position
 */
function magicanAssistant(number, position) {
  if (position < 0) return { position: 0, result: '' };
  let result = '';
  let i;
  for (i = position; i >= 0 && i >= position - 2; i--) result += number[i];
  return { position: i, result: result.reverse() };
}
