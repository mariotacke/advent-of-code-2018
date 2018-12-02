const assert = require('assert');

const checksum = require('./checksum');
const common = require('./common');

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

  describe('Part Two', () => {
    it('should find common characters', () => {
      const boxIds =
        `abcde
         fghij
         klmno
         pqrst
         fguij
         axcye
         wvxyz`;

      assert.strictEqual(common(boxIds), 'fgij');
    });
  });
});
