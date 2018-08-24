const debug = require('debug')('api:tests');
const should = require('should');
const server = require('../app').listen(3005);
const request = require('supertest').agent(server);

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

  it('sends 1 to the server', async () => {
    const {body: {result}} = await request
      .get('/translate/1')
      .expect('Content-Type', /json/)
      .expect(200);

    result.should.be.eql('one');
  });
});