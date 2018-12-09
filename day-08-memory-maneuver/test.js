const assert = require('assert');

const memory = require('./memory');
const memory2 = require('./memory2');

describe('Day 8: Memory Maneuver', () => {
  it('should calculate sum of metadata entries', () => {
    const input = '2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2';

    assert.strictEqual(memory(input), 138);
  });

  describe('Part Two', () => {
    it('should calculate value of root node', () => {
      const input = '2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2';

      assert.strictEqual(memory2(input), 66);
    });
  });
});
