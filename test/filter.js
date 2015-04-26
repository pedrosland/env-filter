var expect = require('chai').expect;
var filter = require('../').filter;

describe('filter()', function() {

  describe('without the env parameter', function() {

    beforeEach(function() {
      process.env.TEST_KEEP_ENV_VAR = 'keep';
      process.env.TEST_DROP_ENV_VAR = 'drop';
    });

    afterEach(function() {
      delete process.env.TEST_KEEP_ENV_VAR;
      delete process.env.TEST_DROP_ENV_VAR;
    });

    it('should filter the environment', function() {
      var clean = filter(['TEST_DROP_ENV_VAR']);

      expect(clean.env).not.to.have.property('TEST_DROP_ENV_VAR');
      expect(clean.env).to.have.property('TEST_KEEP_ENV_VAR', 'keep');

      expect(clean.extraEnv).not.to.have.property('TEST_KEEP_ENV_VAR');
      expect(clean.extraEnv).to.have.property('TEST_DROP_ENV_VAR', 'drop');
    });

  });

  it('should accept an environment object to filter', function() {
    var clean = filter(['ONE', 'TWO'], {
      ONE: 'one',
      TWO: 'two',
      THREE: 'three'
    });

    expect(clean.env).to.deep.equal({
      THREE: 'three'
    });
  });

  it('should add filtered environment variables to the extraEnv property', function() {
    var clean = filter(['ONE', 'TWO'], {
      ONE: 'one',
      TWO: 'two',
      THREE: 'three'
    });

    expect(clean.extraEnv).to.deep.equal({
      ONE: 'one',
      TWO: 'two'
    });
  });

  it('should join non-empty filtered values with a space character', function() {
    var clean = filter(['ONE', 'TWO'], {
      ONE: 'one',
      TWO: 'two',
      THREE: 'three'
    });

    expect(clean.args).to.equal('one two');
  });

  it('should ignore non-empty filtered values in args property', function() {
    var clean = filter(['ONE', 'TWO', 'EMPTY'], {
      ONE: 'one',
      TWO: 'two',
      THREE: 'three',
      EMPTY: ''
    });

    expect(clean.env).not.to.have.property('EMPTY');
    expect(clean.extraEnv).to.have.property('EMPTY', '');
    expect(clean.args).to.equal('one two');
  });

});
