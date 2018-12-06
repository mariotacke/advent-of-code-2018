const assert = require('assert');

const area = require('./area');
const area2 = require('./area2');

describe('Day 6: Chronal Coordinates', () => {
  it('should calculate largest area', () => {
    const coordinates =
      `1, 1
       1, 6
       8, 3
       3, 4
       5, 5
       8, 9`;

    assert.strictEqual(area(coordinates), 17);
  });

  describe('Part Two', () => {
    it('should calculate largest region', () => {
      const coordinates =
        `1, 1
         1, 6
         8, 3
         3, 4
         5, 5
         8, 9`;

      assert.strictEqual(area2(coordinates, 32), 16);
    });
  });
});
