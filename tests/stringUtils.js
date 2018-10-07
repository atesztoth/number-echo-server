const should = require('should');
require('../api/utils/stringUtils');

describe('stringutils', function () {
  it('reverse asd', () => 'asd'.reverse().should.be.eql('dsa'));
  it('reverse asdf', () => 'asdf'.reverse().should.be.eql('fdsa'));
  it('reverse a', () => 'a'.reverse().should.be.eql('a'));
  it('clean "good"', () => 'good'.clean().should.be.eql('good'));
  it('clean "good "', () => 'good '.clean().should.be.eql('good'));
  it('clean "good, "', () => 'good, '.clean().should.be.eql('good'));
});