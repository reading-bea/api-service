const supertest = require('supertest');
const app = require('../src/app');

describe('App Routes', () => {
  it('/blahblah returns a 404 error page', done => {
    supertest(app)
      .get('/')
      .expect(404, done);
  });
});
