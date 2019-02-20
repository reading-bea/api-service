const { expect } = require('chai');
const sinon = require('sinon');
const ErrorController = require('../../src/error/error-controller');

const sandbox = sinon.createSandbox();

describe('--- Error Handler Controller ---', () => {

  let next;

  beforeEach(() => next = sandbox.spy());
  afterEach(() => sandbox.restore());

  it('should set the Cache-Control header', done => {
    const error = new Error();

    const response = {
      headersSent: false,
      status: sandbox.stub().returnsThis(),
      set: sandbox.stub().callsFake(() => {
        expect(response.set.calledOnce).to.be.true;
        expect(
          response.set.calledWith(
            'Cache-Control',
            'no-cache, no-store, must-revalidate'
          )
        ).to.be.true;
        done();
      })
    };
    ErrorController(error, null, response, next);
  });

  it('should call the send method', done => {
    const error = new Error('Test error message');
    const templateParams = { title: 'Error', error: error.message };

    const response = {
      headersSent: false,
      status: sandbox.stub().returnsThis(),
      set: () => { },
      send: sandbox.stub().callsFake(() => {
        expect(response.send.calledOnce).to.be.true;
        expect(response.send.calledWith('Error: Test error message')).to.be.true;
        done();
      })
    };
    ErrorController(error, null, response, next);
  });

});
