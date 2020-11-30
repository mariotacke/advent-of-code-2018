const assert = require('assert');

const teleport = require('./teleport');

describe('Day 23: Experimental Emergency Teleportation', () => {
  it('should determine number of nanobots in range of strongest', () => {
    const nanobots =
      `pos=<0,0,0>, r=4
       pos=<1,0,0>, r=1
       pos=<4,0,0>, r=3
       pos=<0,2,0>, r=1
       pos=<0,5,0>, r=3
       pos=<0,0,3>, r=1
       pos=<1,1,1>, r=1
       pos=<1,1,2>, r=1
       pos=<1,3,1>, r=1`;

    assert.strictEqual(teleport(nanobots), 7);
  });
});
