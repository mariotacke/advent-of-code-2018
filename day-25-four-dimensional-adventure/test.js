const assert = require('assert');

const constellations = require('./constellations');

describe('Day 25: Four-Dimensional Adventure', () => {
  it('should determine number of constellations (example #1)', () => {
    const points =
      `0,0,0,0
       3,0,0,0
       0,3,0,0
       0,0,3,0
       0,0,0,3
       0,0,0,6
       9,0,0,0
      12,0,0,0`;

    assert.strictEqual(constellations(points), 2);
  });

  it('should determine number of constellations (example #2)', () => {
    const points =
      `-1,2,2,0
       0,0,2,-2
       0,0,0,-2
       -1,2,0,0
       -2,-2,-2,2
       3,0,2,-1
       -1,3,2,2
       -1,0,-1,0
       0,2,1,-2
       3,0,0,0`;

    assert.strictEqual(constellations(points), 4);
  });

  it('should determine number of constellations (example #3)', () => {
    const points =
      `1,-1,0,1
       2,0,-1,0
       3,2,-1,0
       0,0,3,1
       0,0,-1,-1
       2,3,-2,0
       -2,2,0,0
       2,-2,0,-1
       1,-1,0,-1
       3,2,0,2`;

    assert.strictEqual(constellations(points), 3);
  });

  it('should determine number of constellations (example #4)', () => {
    const points =
      `1,-1,-1,-2
       -2,-2,0,1
       0,2,1,3
       -2,3,-2,1
       0,2,3,-2
       -1,-1,1,-2
       0,-2,-1,0
       -2,2,3,-1
       1,2,2,0
       -1,-2,0,-2`;

    assert.strictEqual(constellations(points), 8);
  });
});
