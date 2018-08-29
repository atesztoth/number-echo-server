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
  const { postFixes, numberTranslations } = translations;
  let output = '';

  for (let i = string.length - 3; i >= 0; i--) {
    const num = Number(string[i]);
    if (num === 0) continue;
    const distance = (string.length - 3) - i;
    output = numberTranslations[num] + ' ' + postFixes[distance] + (output === '' ? ' ' : ', ') + output;
  }

  const lastTwo = string.slice(-2);
  output += lastTwo !== '00' ? 'and ' + translateSpecial(lastTwo) : '';

  return output.trim();
}