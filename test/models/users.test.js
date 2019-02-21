const { expect } = require('chai');
const sandbox = require('sinon').createSandbox();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Users = require('../../src/models/users');

describe('Users Model', () => {

  afterEach(() => sandbox.restore());

  describe('setPassword()', () => {

    it('should set the hash and salt variables in the model', () => {
      sandbox.stub(crypto, 'randomBytes').callsFake(() => ({ toString: () => 'imarandomhash' }));
      sandbox.stub(crypto, 'pbkdf2Sync').callsFake(() => ({ toString: () => 'imahash' }));

      const user = new Users();

      user.setPassword('password');

      expect(user.salt).to.equal('imarandomhash');
      expect(user.hash).to.equal('imahash');
    });

  });

  describe('validatePassword()', () => {

    it('should validate the password successfully', () => {
      sandbox.stub(crypto, 'randomBytes').callsFake(() => ({ toString: () => 'imarandomhash' }));
      sandbox.stub(crypto, 'pbkdf2Sync').callsFake(() => ({ toString: () => 'imahash' }));

      const user = new Users();

      user.setPassword('password');

      expect(user.validatePassword('password')).to.be.true;
    });

  });

  describe('generateJWT()', () => {

    it('should successfully create the jwt', () => {
      sandbox.stub(jwt, 'sign').returns('imajwt');

      const user = new Users();
      const token = user.generateJWT();

      expect(token).to.equal('imajwt');
    });

  });

  describe('toAuthJSON()', () => {

    it('should return the authorised user json', () => {
      sandbox.stub(jwt, 'sign').returns('imajwt');

      const user = new Users({
        email: 'email',
        username: 'username',
        password: 'password'
      });
      const authJson = user.toAuthJSON();

      expect(authJson.email).to.equal('email');
      expect(authJson.username).to.equal('username');
      expect(authJson.token).to.equal('imajwt');
    });

  });

});
