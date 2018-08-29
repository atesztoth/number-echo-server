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
  const { body: { result } } = await request
    .get('/translate/' + number)
    .expect('Content-Type', /json/)
    .expect(200);

  result.should.be.eql(equalTo);
};

describe('TESTS', function () {

  after(() => server.close());

  it('GET /', async () => {
    const { body: { message } } = await request
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200);

    should.exist(message);
    message.should.be.eql('Hello');
  });

  it('GET /translate/', async () => {
    const { body: { message } } = await request
      .get('/translate/')
      .expect('Content-Type', /json/)
      .expect(400);

    should.exist(message);
    message.should.be.eql('You\'ve given no number.');
  });

  describe('0-9', function () {
    it('sends number 0 to the server', async () => await numberTester(0, 'zero'));
    it('sends number 1 to the server', async () => await numberTester(1, 'one'));
    it('sends number 2 to the server', async () => await numberTester(2, 'two'));
    it('sends number 3 to the server', async () => await numberTester(3, 'three'));
    it('sends number 4 to the server', async () => await numberTester(4, 'four'));
    it('sends number 5 to the server', async () => await numberTester(5, 'five'));
    it('sends number 6 to the server', async () => await numberTester(6, 'six'));
    it('sends number 7 to the server', async () => await numberTester(7, 'seven'));
    it('sends number 8 to the server', async () => await numberTester(8, 'eight'));
    it('sends number 9 to the server', async () => await numberTester(9, 'nine'));

  });

  describe('specials from 10 to 20', function () {
    it('sends number 11 to the server', async () => await numberTester(11, 'eleven'));
    it('sends number 12 to the server', async () => await numberTester(12, 'twelve'));
    it('sends number 13 to the server', async () => await numberTester(13, 'thirteen'));
    it('sends number 14 to the server', async () => await numberTester(14, 'fourteen'));
    it('sends number 15 to the server', async () => await numberTester(15, 'fifteen'));
  });

  describe('others from 10 to 20', function () {
    it('sends number 16 to the server', async () => await numberTester(16, 'sixteen'));
    it('sends number 17 to the server', async () => await numberTester(17, 'seventeen'));
  });

  describe('tens only from 10-100', function () {
    it('sends number 10 to the server', async () => await numberTester(10, 'ten'));
    it('sends number 20 to the server', async () => await numberTester(20, 'twenty'));
    it('sends number 30 to the server', async () => await numberTester(30, 'thirty'));
    it('sends number 40 to the server', async () => await numberTester(40, 'fourty'));
    it('sends number 50 to the server', async () => await numberTester(50, 'fifty'));
    it('sends number 60 to the server', async () => await numberTester(60, 'sixty'));
    it('sends number 70 to the server', async () => await numberTester(70, 'seventy'));
    it('sends number 80 to the server', async () => await numberTester(80, 'eighty'));
    it('sends number 90 to the server', async () => await numberTester(90, 'ninety'));
  });

  describe('more specials', function () {
    it('sends number 122 to the server', async () => await numberTester(122, 'one hundred and twenty-two'));
    it('sends number 132 to the server', async () => await numberTester(132, 'one hundred and thirty-two'));
    it('sends number 152 to the server', async () => await numberTester(152, 'one hundred and fifty-two'));
  });

  describe('other numbers', function () {
    it('sends number 100 to the server', async () => await numberTester(100, 'one hundred'));
    it('sends number 101 to the server', async () => await numberTester(101, 'one hundred and one'));
    it('sends number 110 to the server', async () => await numberTester(110, 'one hundred and ten'));

    it('sends number 111 to the server', async () => await numberTester(111, 'one hundred and eleven'));
    it('sends number 112 to the server', async () => await numberTester(112, 'one hundred and twelve'));
    it('sends number 113 to the server', async () => await numberTester(113, 'one hundred and thirteen'));
    it('sends number 115 to the server', async () => await numberTester(115, 'one hundred and fifteen'));

    it('sends number 116 to the server', async () => await numberTester(116, 'one hundred and sixteen'));
    it('sends number 140 to the server', async () => await numberTester(140, 'one hundred and fourty'));

    it('sends number 120 to the server', async () => await numberTester(120, 'one hundred and twenty'));
    it('sends number 130 to the server', async () => await numberTester(130, 'one hundred and thirty'));
    it('sends number 150 to the server', async () => await numberTester(150, 'one hundred and fifty'));

    it('sends number 160 to the server', async () => await numberTester(160, 'one hundred and sixty'));
    it('sends number 170 to the server', async () => await numberTester(170, 'one hundred and seventy'));

    it('sends number 4321 to the server', async () =>
      await numberTester(4321, 'four thousand, three hundred and twenty-one'));
  });

  describe('more criticals: 101, 200, 300, 400, 500, 900, 999, 1000, 1001, 9999', function () {
    it('sends number 101 to the server', async () => await numberTester(101, 'one hundred and one'));
    it('sends number 200 to the server', async () => await numberTester(200, 'two hundred'));
    it('sends number 300 to the server', async () => await numberTester(300, 'three hundred'));
    it('sends number 400 to the server', async () => await numberTester(400, 'four hundred'));
    it('sends number 500 to the server', async () => await numberTester(500, 'five hundred'));
    it('sends number 600 to the server', async () => await numberTester(600, 'six hundred'));
    it('sends number 700 to the server', async () => await numberTester(700, 'seven hundred'));
    it('sends number 800 to the server', async () => await numberTester(800, 'eight hundred'));
    it('sends number 900 to the server', async () => await numberTester(900, 'nine hundred'));
    it('sends number 999 to the server', async () => await numberTester(999, 'nine hundred and ninety-nine'));
    it('sends number 1000 to the server', async () => await numberTester(1000, 'one thousand'));
    it('sends number 1001 to the server', async () => await numberTester(1001, 'one thousand and one'));
    it('sends number 9999 to the server', async () =>
      await numberTester(9999, 'nine thousand, nine hundred and ninety-nine'));
  });

  describe('big ones', function () {
    it('sends number 1.000.000 to the server',
      async () => await numberTester(1000000, 'one million'));
    it('sends number 1.000.001 to the server',
      async () => await numberTester(1000000, 'one million and one'));
  });

  describe('negative test', function () {
    it('checks whether the response is good, if a string has been sent', async () => {
      const { body: { message } } = await request
        .get('/translate/not_a_number')
        .expect('Content-Type', /json/)
        .expect(400);

      message.should.be.eql('This was not a number.');
    });

    it('checks for too small number', async () => {
      const { body: { message } } = await request
        .get('/translate/-50')
        .expect('Content-Type', /json/)
        .expect(400);

      message.should.be.eql('Sorry, we only support numbers greater than 0.');
    });
  });
});