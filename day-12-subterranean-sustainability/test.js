const assert = require('assert');

const sustainability = require('./sustainability');

describe('Day 12: Subterranean Sustainability', () => {
  it('should simulate 20 generations of flower growth', () => {
    const input =
      `initial state: #..#.#..##......###...###

       ...## => #
       ..#.. => #
       .#... => #
       .#.#. => #
       .#.## => #
       .##.. => #
       .#### => #
       #.#.# => #
       #.### => #
       ##.#. => #
       ##.## => #
       ###.. => #
       ###.# => #
       ####. => #`;

    assert.strictEqual(sustainability(input), 325);
  });
});
