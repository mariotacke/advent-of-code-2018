const assert = require('assert');

const marble = require('./marble');

describe('Day 9: Marble Mania', () => {
  it('should calculate high score for 9 players; last marble is worth 25 points', () => {
    const input = '9 players; last marble is worth 25 points';

    assert.strictEqual(marble(input), 32);
  });

  it('should calculate high score for 10 players; last marble is worth 1618 points', () => {
    const input = '10 players; last marble is worth 1618 points';

    assert.strictEqual(marble(input), 8317);
  });

  it('should calculate high score for 13 players; last marble is worth 7999 points', () => {
    const input = '13 players; last marble is worth 7999 points';

    assert.strictEqual(marble(input), 146373);
  });

  it('should calculate high score for 17 players; last marble is worth 1104 points', () => {
    const input = '17 players; last marble is worth 1104 points';

    assert.strictEqual(marble(input), 2764);
  });

  it('should calculate high score for 21 players; last marble is worth 6111 points', () => {
    const input = '21 players; last marble is worth 6111 points';

    assert.strictEqual(marble(input), 54718);
  });

  it('should calculate high score for 30 players; last marble is worth 5807 points', () => {
    const input = '30 players; last marble is worth 5807 points';

    assert.strictEqual(marble(input), 37305);
  });
});
