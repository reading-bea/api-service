const { expect } = require('chai');
const sandbox = require('sinon').createSandbox();
const config = require('config');
const { isCloudEnvironment, getEnvironmentDnsFragment } = require('../../src/helpers/environment-helper');

describe('Environment Helper', () => {

  afterEach(() => sandbox.restore());

  describe('.isCloudEnvironment()', () => {

    it('should return false if the environmnt is equal to "local"', () => {
      sandbox.stub(config, 'get').callsFake((...args) => {
        if (args[0] === 'environment') {
          return 'local';
        }
      });
      expect(isCloudEnvironment()).to.be.false;
    });

    it('should return true if the environmnt is equal to "live"', () => {
      sandbox.stub(config, 'get').callsFake((...args) => {
        if (args[0] === 'environment') {
          return 'live';
        }
      });
      expect(isCloudEnvironment()).to.be.true;
    });

  });

  describe('.getEnvironmentDnsFragment()', () => {

    it('should return "." if the environment is "live"', () => {
      sandbox.stub(config, 'get').callsFake((...args) => {
        if (args[0] === 'environment') {
          return 'live';
        }
      });
      expect(getEnvironmentDnsFragment()).to.be.equal('.');
    });

  });

});
