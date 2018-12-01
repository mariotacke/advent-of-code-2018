const assert = require('assert');

const chronalCalibration = require('./chronal-calibration');
const chronalCalibration2 = require('./chronal-calibration2');

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

  describe('Part Two', () => {
    it('should calculate first duplicate frequency from +1, -2, +3, +1', () => {
      const changes =
        `+1
         -2
         +3
         +1`;

      assert.strictEqual(chronalCalibration2(changes), 2);
    });

    it('should calculate first duplicate frequency from +1, -1', () => {
      const changes =
        `+1
         -1`;

      assert.strictEqual(chronalCalibration2(changes), 0);
    });

    it('should calculate first duplicate frequency from +3, +3, +4, -2, -4', () => {
      const changes =
        `+3
         +3
         +4
         -2
         -4`;

      assert.strictEqual(chronalCalibration2(changes), 10);
    });

    it('should calculate first duplicate frequency from -6, +3, +8, +5, -6', () => {
      const changes =
        `-6
         +3
         +8
         +5
         -6`;

      assert.strictEqual(chronalCalibration2(changes), 5);
    });

    it('should calculate first duplicate frequency from +7, +7, -2, -7, -4', () => {
      const changes =
        `+7
         +7
         -2
         -7
         -4`;

      assert.strictEqual(chronalCalibration2(changes), 14);
    });
  });
});
