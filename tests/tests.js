const debug = require('debug')('api:tests');
const should = require('should');
const server = require('../app').listen(3005);
const request = require('supertest').agent(server);

// I am a bit lazy, I will not write that request every time :$
/**
 * Sends arbitrary number to the server, and returns the result.
 * @param number
 * @param equalTo
 * @returns {Promise<void>}
 */
const numberTester = async function (number, equalTo) {
  const {body: {result}} = await request
    .get('/translate/' + number)
    .expect('Content-Type', /json/)
    .expect(200);

  result.should.be.eql(equalTo);
};

describe('TESTS', function () {

  after(() => server.close());

  it('tests sayhello', async () => {
    const {body: {message}} = await request
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200);

    should.exist(message);
    message.should.be.eql('Hello');
  });

  it('sends number 1 to the server', async () => await numberTester(1, 'one'));
  it('sends number 2 to the server', async () => await numberTester(2, 'two'));
  it('sends number 3 to the server', async () => await numberTester(3, 'three'));
  it('sends number 4 to the server', async () => await numberTester(4, 'four'));
  it('sends number 5 to the server', async () => await numberTester(5, 'five'));
  it('sends number 6 to the server', async () => await numberTester(6, 'six'));
  it('sends number 7 to the server', async () => await numberTester(7, 'seven'));
  it('sends number 8 to the server', async () => await numberTester(8, 'eight'));
  it('sends number 9 to the server', async () => await numberTester(9, 'nine'));
  it('sends number 10 to the server', async () => await numberTester(10, 'ten'));
});