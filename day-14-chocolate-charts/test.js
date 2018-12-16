const assert = require('assert');

const recipe = require('./recipe');
const recipe2 = require('./recipe2');

describe('Day 14: Chocolate Charts', () => {
  it('should calculate the score of the ten recipes immediately after 9', () => {
    assert.strictEqual(recipe(9), '5158916779');
  });

  it('should calculate the score of the ten recipes immediately after 5', () => {
    assert.strictEqual(recipe(5), '0124515891');
  });

  it('should calculate the score of the ten recipes immediately after 18', () => {
    assert.strictEqual(recipe(18), '9251071085');
  });

  it('should calculate the score of the ten recipes immediately after 2018', () => {
    assert.strictEqual(recipe(2018), '5941429882');
  });

  describe('Part Two', () => {
    it('should calculate number of recipes before 51589', () => {
      assert.strictEqual(recipe2('51589'), 9);
    });

    it('should calculate number of recipes before 01245', () => {
      assert.strictEqual(recipe2('01245'), 5);
    });

    it('should calculate number of recipes before 92510', () => {
      assert.strictEqual(recipe2('92510'), 18);
    });

    it('should calculate number of recipes before 59414', () => {
      assert.strictEqual(recipe2('59414'), 2018);
    });
  });
});
