const assert = require('assert');

const fabric = require('./fabric');

describe('Day 3: No Matter How You Slice It', () => {
  it('should calculate overlapping area', () => {
    const claims =
      `#1 @ 1,3: 4x4
       #2 @ 3,1: 4x4
       #3 @ 5,5: 2x2`;

    assert.strictEqual(fabric(claims, 11, 9), 4);
  });
});
