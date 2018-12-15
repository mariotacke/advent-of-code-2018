const assert = require('assert');

const mine = require('./mine');
const mine2 = require('./mine2');

const displayHelper = (input) => {
  const padding = input
    .split('\n')
    .map((line) => line
      .split('')
      .findIndex((value) => value !== ' '))
    .sort((a, b) => b - a)[0];

  return input
    .split('\n')
    .map((line) => line
      .split('')
      .slice(padding - 2, line.length)
      .join(''))
    .join('\n');
};

describe('Day 13: Mine Cart Madness', () => {
  it('should determine the location of the first crash', () => {
    const tracks = displayHelper(String.raw`
      /->-\
      |   |  /----\
      | /-+--+-\  |
      | | |  | v  |
      \-+-/  \-+--/
        \------/
    `);

    assert.strictEqual(mine(tracks), '7,3');
  });

  describe('Part Two', () => {
    it('should determine the location of the last cart', () => {
      const tracks = displayHelper(String.raw`
        />-<\
        |   |
        | /<+-\
        | | | v
        \>+</ |
          |   ^
          \<->/
      `);

      assert.strictEqual(mine2(tracks), '6,4');
    });
  });
});
