const assert = require('assert');

const teleport = require('./teleport');
const teleport2 = require('./teleport2');

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

  xdescribe('Part Two', () => {
    it('should determine shortest distance between points and 0,0,0', () => {
      const nanobots =
        `pos=<10,12,12>, r=2
         pos=<12,14,12>, r=2
         pos=<16,12,12>, r=4
         pos=<14,14,14>, r=6
         pos=<50,50,50>, r=200
         pos=<10,10,10>, r=5`;

      assert.strictEqual(teleport2(nanobots), 36);
    });
  });
});
