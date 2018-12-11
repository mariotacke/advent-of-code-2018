const assert = require('assert');

const fuelcells = require('./fuelcells');

describe('Day 11: Chronal Charge', () => {
  it('should get x,y of largest total power for serial number 18', () => {

    assert.strictEqual(fuelcells(18), '33,45');
  });

  it('should get x,y of largest total power for serial number 42', () => {

    assert.strictEqual(fuelcells(42), '21,61');
  });
});
