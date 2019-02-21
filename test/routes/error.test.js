const { expect } = require('chai');
const sinon = require('sinon');
const errorRoute = require('../../src/routes/error');

const sandbox = sinon.createSandbox();

describe('Error Route', () => {

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

    errorRoute(response, error);
  });

  it('should call the json method', done => {
    const error = new Error('Test error message');
    const response = {
      headersSent: false,
      status: sandbox.stub().returnsThis(),
      set: () => { },
      json: sandbox.stub().callsFake(() => {
        expect(response.json.calledOnce).to.be.true;
        done();
      })
    };

    errorRoute(response, error);
  });

  it('should call next if headers have been sent already', () => {
    const next = sandbox.spy();
    const error = new Error('Test error message');
    const response = {
      headersSent: true,
      status: sandbox.stub().returnsThis(),
      set: () => { },
      json: sandbox.stub()
    };

    errorRoute(response, error, next);

    expect(next.calledOnce).to.be.true;
  });

});
