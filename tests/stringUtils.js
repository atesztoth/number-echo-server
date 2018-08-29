const should = require('should');
require('../api/utils/stringUtils');

describe('stringutils', function () {
  it('tests reverse', () => 'asd'.reverse().should.be.eql('dsa'));
  it('tests reverse', () => 'asdf'.reverse().should.be.eql('fdsa'));
  it('tests reverse', () => 'a'.reverse().should.be.eql('a'));
});