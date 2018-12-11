const assert = require('assert');

const fuelcells = require('./fuelcells');
const fuelcells2 = require('./fuelcells2');

describe('Day 11: Chronal Charge', () => {
  it('should get x,y of largest total power for serial number 18', () => {

    assert.strictEqual(fuelcells(18), '33,45');
  });

  it('should get x,y of largest total power for serial number 42', () => {

    assert.strictEqual(fuelcells(42), '21,61');
  });

  describe('Part Two', () => {
    xit('should get x,y of largest total power for serial number 18', () => {

      assert.strictEqual(fuelcells2(18), '90,269,16');
    });

    xit('should get x,y of largest total power for serial number 42', () => {

      assert.strictEqual(fuelcells2(42), '232,251,12');
    });
  });
});
