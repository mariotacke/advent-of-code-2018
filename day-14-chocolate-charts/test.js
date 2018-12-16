const assert = require('assert');

const recipe = require('./recipe');

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
});
