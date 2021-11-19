const assert = require('assert');

const research = require('./research');

describe('Day 17: Reservoir Research', () => {
  it('should calculate water reach', () => {
    const scan =
      `x=495, y=2..7
       y=7, x=495..501
       x=501, y=3..7
       x=498, y=2..4
       x=506, y=1..2
       x=498, y=10..13
       x=504, y=10..13
       y=13, x=498..504`;

    assert.strictEqual(research(scan)[0], 57);
  });

  describe('Part Two', () => {
    it('should count only water at rest', () => {
      const scan =
        `x=495, y=2..7
         y=7, x=495..501
         x=501, y=3..7
         x=498, y=2..4
         x=506, y=1..2
         x=498, y=10..13
         x=504, y=10..13
         y=13, x=498..504`;

      assert.strictEqual(research(scan)[1], 29);
    });
  });

});
