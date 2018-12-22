const assert = require('assert');

const combat = require('./combat');

const displayHelper = (expectedOutput) => expectedOutput.replace(/^ +/gm, '');

describe('Day 15: Beverage Bandits', () => {
  it('should simulate combat 1', () => {
    const input = displayHelper(
      `#######
       #.G...#
       #...EG#
       #.#.#G#
       #..G#E#
       #.....#
       #######`);

    assert.strictEqual(combat(input), 27730);
  });

  it('should simulate combat 2', () => {
    const input = displayHelper(
      `#######
       #G..#E#
       #E#E.E#
       #G.##.#
       #...#E#
       #...E.#
       #######`);

    assert.strictEqual(combat(input), 36334);
  });

  it('should simulate combat 3', () => {
    const input = displayHelper(
      `#######
       #E..EG#
       #.#G.E#
       #E.##E#
       #G..#.#
       #..E#.#
       #######`);

    assert.strictEqual(combat(input), 39514);
  });

  it('should simulate combat 4', () => {
    const input = displayHelper(
      `#######
       #E.G#.#
       #.#G..#
       #G.#.G#
       #G..#.#
       #...E.#
       #######`);

    assert.strictEqual(combat(input), 27755);
  });

  it('should simulate combat 5', () => {
    const input = displayHelper(
      `#######
       #.E...#
       #.#..G#
       #.###.#
       #E#G#G#
       #...#G#
       #######`);

    assert.strictEqual(combat(input), 28944);
  });

  it('should simulate combat 6', () => {
    const input = displayHelper(
      `#########
       #G......#
       #.E.#...#
       #..##..G#
       #...##..#
       #...#...#
       #.G...G.#
       #.....G.#
       #########`);

    assert.strictEqual(combat(input), 18740);
  });
});
