const assert = require('assert');

const checksum = require('./checksum');

describe('Day 2: Inventory Management System', () => {
  it('should calculate checksum from box ids', () => {
    const boxIds =
      `abcdef
       bababc
       abbcde
       abcccd
       aabcdd
       abcdee
       ababab`;

    assert.strictEqual(checksum(boxIds), 12);
  });
});
