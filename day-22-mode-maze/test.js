const assert = require('assert');

const maze = require('./maze');

describe('Day 22: Mode Maze', () => {
  it('should calculate total risk level', () => {
    const scan =
      `depth: 510
       target: 10,10`;

    assert.strictEqual(maze(scan), 114);
  });
});
