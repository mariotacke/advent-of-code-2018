const assert = require('assert');

const fabric = require('./fabric');
const fabric2 = require('./fabric2');

describe('Day 3: No Matter How You Slice It', () => {
  it('should calculate overlapping area', () => {
    const claims =
      `#1 @ 1,3: 4x4
       #2 @ 3,1: 4x4
       #3 @ 5,5: 2x2`;

    assert.strictEqual(fabric(claims, 11, 9), 4);
  });

  describe('Part Two', () => {
    it('should determine id of lone claim', () => {
      const claims =
        `#1 @ 1,3: 4x4
         #2 @ 3,1: 4x4
         #3 @ 5,5: 2x2`;

      assert.strictEqual(fabric2(claims, 11, 9), 3);
    });
  });
});
