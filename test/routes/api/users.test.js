const supertest = require('supertest');
const sandbox = require('sinon').createSandbox();
const { expect } = require('chai');
const app = require('../../../src/app');

describe('Users Routes', () => {

  afterEach(() => sandbox.restore());

  describe('/users', () => {

    // it('should return users successfully', done => {
    //   supertest(app)
    //     .get('/users')
    //     .then(res => {
    //       const { statusCode } = res;
    //       expect(statusCode).to.equal(200);
    //       done();
    //     });
    // });

  });

});
