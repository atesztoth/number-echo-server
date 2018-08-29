String.prototype.reverse = function () {
  let result = '';
  for (let i = 0; i < this.length; i++) result += this[this.length - 1 - i];
  return result;
};

String.prototype.clean = function () {
  let result = this.trim();
  if (result.slice(-1) !== ',') return result;
  return result.slice(0, result.length - 1);
};