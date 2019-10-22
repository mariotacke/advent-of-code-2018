const assert = require('assert');

const settlers = require('./settlers');

const displayHelper = (expectedOutput) => expectedOutput.replace(/^ +/gm, '');

describe('Day 18: Settlers of The North Pole', () => {
  it('should simulate 1 minute', () => {
    const input = displayHelper(
      `.#.#...|#.
       .....#|##|
       .|..|...#.
       ..|#.....#
       #.#|||#|#|
       ...#.||...
       .|....|...
       ||...#|.#|
       |.||||..|.
       ...#.|..|.`);

    assert.strictEqual(settlers(input, 1), 480);
  });

  it('should simulate 10 minutes', () => {
    const input = displayHelper(
      `.#.#...|#.
       .....#|##|
       .|..|...#.
       ..|#.....#
       #.#|||#|#|
       ...#.||...
       .|....|...
       ||...#|.#|
       |.||||..|.
       ...#.|..|.`);

    assert.strictEqual(settlers(input, 10), 1147);
  });
});
