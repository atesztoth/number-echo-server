String.prototype.reverse = function () {
  let result = '';
  for (let i = 0; i < this.length; i++) result += this[this.length - 1 - i];
  return result;
};