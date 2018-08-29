const numbers = {
  0: 'zero',
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine',
};

const specials = {
  10: 'ten',
  11: 'eleven',
  12: 'twelve',
  13: 'thirteen',
  15: 'fifteen',
  20: 'twenty',
  30: 'thirty',
  40: 'fourty',
  50: 'fifty',
};

const postFixes = ['thousand', 'million', 'milliad', 'billion', 'billiard', 'trillion'];

module.exports = { numberTranslations: numbers, specialNumbers: specials, postFixes: postFixes };