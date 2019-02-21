const supertest = require('supertest');
const sandbox = require('sinon').createSandbox();
const { expect } = require('chai');
const axios = require('axios');
const app = require('../../../src/app');
const bookFixture = require('../../fixtures/models/book.json');

describe('Books Routes', () => {

  afterEach(() => sandbox.restore());

  it('/books returns an array of books', done => {
    sandbox.stub(axios, 'get').returns({
      then: callback => {
        callback({
          data: {
            items: [bookFixture, bookFixture, bookFixture, bookFixture, bookFixture, bookFixture]
          }
        });
        return { catch: () => {} };
      }
    });

    supertest(app)
      .get('/books')
      .then(res => {
        const { body, statusCode } = res;
        expect(statusCode).to.equal(200);
        expect(body.length).to.equal(6);
        done();
      });
  });

  it('/books returns an error message when it errors', done => {
    sandbox.stub(axios, 'get').returns({
      then: () => {
        return { catch: callback => callback(new Error('This is an error')) };
      }
    });

    supertest(app)
      .get('/books')
      .then(res => {
        const { body, statusCode } = res;
        expect(statusCode).to.equal(500);
        expect(body).deep.equal({
          error: 'This is an error'
        });
        done();
      });
  });

});
