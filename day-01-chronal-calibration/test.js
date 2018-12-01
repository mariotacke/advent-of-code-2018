const assert = require('assert');

const chronalCalibration = require('./chronal-calibration');

describe('Day 1: Chronal Calibration', () => {
  it('should calculate frequency from +1, -2, +3, +1', () => {
    const changes =
      `+1
       -2
       +3
       +1`;

    assert.strictEqual(chronalCalibration(changes), 3);
  });

  it('should calculate frequency from +1, +1, +1', () => {
    const changes =
      `+1
       +1
       +1`;

    assert.strictEqual(chronalCalibration(changes), 3);
  });

  it('should calculate frequency from +1, +1, -2', () => {
    const changes =
      `+1
       +1
       -2`;

    assert.strictEqual(chronalCalibration(changes), 0);
  });

  it('should calculate frequency from -1, -2, -3', () => {
    const changes =
      `-1
       -2
       -3`;

    assert.strictEqual(chronalCalibration(changes), -6);
  });
});
