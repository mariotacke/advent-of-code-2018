const assert = require('assert');

const area = require('./area');

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
});
