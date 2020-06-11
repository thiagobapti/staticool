var assert = require('assert');
var chai = require('chai')
  , expect = chai.expect
  , should = chai.should();

describe('Array', function () {
  describe('#indexOf()', function () {
    var myArray = [1, 2, 3];
    it('should return -1 when the value is not present (ASSERT)', function () {
      assert.equal(myArray.indexOf(4), -1);
    });
    it('should return -1 when the value is not present (EXPECT)', function () {
      expect(myArray.indexOf(4)).to.be.equal(-1);
    });
    it('should return -1 when the value is not present (SHOULD)', function () {
      myArray.indexOf(4).should.be.equal(-1);
    });
  });
});