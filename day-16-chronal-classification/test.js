const assert = require('assert');

const opcodes = require('./opcodes');

describe('Day 16: Chronal Classification', () => {
  it('should calculate the number of opcodes matching 3 or more ops', () => {
    const sample =
      `Before: [3, 2, 1, 1]
       9 2 1 2
       After:  [3, 2, 2, 1]`;

    assert.strictEqual(opcodes(sample), 1);
  });
});
