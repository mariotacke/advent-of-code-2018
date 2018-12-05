const assert = require('assert');

const polymer = require('./polymer');

describe('Day 5: Alchemical Reduction', () => {
  it('should calculate polymer from aA', () => {
    assert.strictEqual(polymer('aA'), 0);
  });

  it('should calculate polymer from abBA', () => {
    assert.strictEqual(polymer('abBA'), 0);
  });

  it('should calculate polymer from abAB', () => {
    assert.strictEqual(polymer('abAB'), 4);
  });

  it('should calculate polymer from aabAAB', () => {
    assert.strictEqual(polymer('aabAAB'), 6);
  });

  it('should calculate polymer from dabAcCaCBAcCcaDA', () => {
    assert.strictEqual(polymer('dabAcCaCBAcCcaDA'), 10);
  });
});
