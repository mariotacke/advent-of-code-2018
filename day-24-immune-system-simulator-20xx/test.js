const assert = require('assert');

const immuneSystem = require('./immune-system');
const immuneSystem2 = require('./immune-system2');

describe('Day 24: Immune System Simulator 20XX', () => {
  it('should simulate how many units the winning army has', () => {
    const input =
      `Immune System:
       17 units each with 5390 hit points (weak to radiation, bludgeoning) with an attack that does 4507 fire damage at initiative 2
       989 units each with 1274 hit points (immune to fire; weak to bludgeoning, slashing) with an attack that does 25 slashing damage at initiative 3

       Infection:
       801 units each with 4706 hit points (weak to radiation) with an attack that does 116 bludgeoning damage at initiative 1
       4485 units each with 2961 hit points (immune to radiation; weak to fire, cold) with an attack that does 12 slashing damage at initiative 4`;

    assert.strictEqual(immuneSystem(input), 5216);
  });

  describe('Part Two', () => {
    it('should simulate how many units are left after getting the smallest boost needed to win', () => {
      const input =
        `Immune System:
         17 units each with 5390 hit points (weak to radiation, bludgeoning) with an attack that does 4507 fire damage at initiative 2
         989 units each with 1274 hit points (immune to fire; weak to bludgeoning, slashing) with an attack that does 25 slashing damage at initiative 3

         Infection:
         801 units each with 4706 hit points (weak to radiation) with an attack that does 116 bludgeoning damage at initiative 1
         4485 units each with 2961 hit points (immune to radiation; weak to fire, cold) with an attack that does 12 slashing damage at initiative 4`;

      assert.strictEqual(immuneSystem2(input), 51);
    });
  });
});
