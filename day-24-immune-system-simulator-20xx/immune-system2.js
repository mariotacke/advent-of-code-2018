const PRINT_COMBAT_TEXT = false;

function print () {
  if (PRINT_COMBAT_TEXT) {
    const args = Array.from(arguments);

    console.log(...args);
  }
}

const parseArmyInformation = (input) => {
  return input
    .split('\n\n')
    .map((army, armyIndex) => {
      const armyName = armyIndex === 0 ? 'Immune System' : 'Infection';
      const groups = army
        .split('\n')
        .slice(1)
        .map((line, groupIndex) => {
          const parts = /(\d+) units each with (\d+) hit points .*with an attack that does (\d+) (\w+) damage at initiative (\d+)/.exec(line.trim());
          const modifiers = /\((.*)\)/.exec(line.trim());

          const tags = modifiers
            ? modifiers[1].split(';').reduce((map, definition) => {
              /weak to/.test(definition)
                ? map.set('weaknesses', new Set(/weak to (.*)/.exec(definition)[1].split(', ')))
                : map.set('immunities', new Set(/immune to (.*)/.exec(definition)[1].split(', ')));

              return map;
            }, new Map())
            : new Map();

          return {
            armyName,
            number: groupIndex + 1,
            units: +parts[1],
            hitPoints: +parts[2],
            weaknesses: tags.get('weaknesses') || new Set(),
            immunities: tags.get('immunities') || new Set(),
            attackDamage: +parts[3],
            attackType: parts[4],
            initiative: +parts[5],
            get effectivePower() {
              return this.units * this.attackDamage;
            },
            get isDead() {
              return this.units <= 0;
            },
          };
        });

      return {
        name: armyName,
        groups,
        get isDead() {
          return this.groups.every((group) => group.isDead);
        },
      };
    });
};

const printArmyStatus = (army) => {
  print(`${army.name}:`);
  army.groups.every((group) => group.isDead)
    ? print('No groups remain.')
    : army.groups.forEach((group) => !group.isDead && print(`Group ${group.number} contains ${group.units} units`));
};

const attackerSelectionSort = (a, b) => {
  return b.effectivePower - a.effectivePower === 0
    ? b.initiative - a.initiative
    : b.effectivePower - a.effectivePower;
};

const effectiveDamage = (attacker, defender) => {
  const { effectivePower, attackType } = attacker;

  return (defender.weaknesses.has(attackType) ? 2 : (defender.immunities.has(attackType) ? 0 : 1)) * effectivePower;
};

const targetSelectionSort = (a, b) => {
  return b.damage - a.damage === 0
    ? b.group.effectivePower - a.group.effectivePower === 0
      ? b.group.initiative - a.group.initiative
      : b.group.effectivePower - a.group.effectivePower
    : b.damage - a.damage;
};

const targetSelectionPhase = (attackers, defenders) => {
  const sortedAttackers = [...attackers.groups].filter((group) => !group.isDead).sort(attackerSelectionSort);
  const availableDefenders = [...defenders.groups].filter((group) => !group.isDead);
  const plannedAttacks = [];

  sortedAttackers.forEach((attackingGroup) => {
    const effectiveDamageOnDefenders = availableDefenders.map((defendingGroup) => {
      return {
        damage: effectiveDamage(attackingGroup, defendingGroup),
        group: defendingGroup,
      };
    });

    // print target selection phase
    effectiveDamageOnDefenders.forEach(({ damage, group }) => {
      print(`${attackers.name} group ${attackingGroup.number} would deal defending group ${group.number} ${damage} damage`);
    });

    if (!effectiveDamageOnDefenders.length) {
      return;
    }

    const selectedTarget = effectiveDamageOnDefenders.sort(targetSelectionSort)[0];

    if (selectedTarget.damage === 0) {
      return;
    }

    plannedAttacks.push({
      attackingGroup,
      defendingGroup: selectedTarget.group,
    });

    const selectedDefenderIndex = availableDefenders.findIndex(({ number }) => selectedTarget.group.number === number);

    availableDefenders.splice(selectedDefenderIndex, 1);
  });

  return plannedAttacks;
};

const attackingPhaseSort = (a, b) => {
  return b.attackingGroup.initiative - a.attackingGroup.initiative;
};

const attackingPhase = (plannedAttacks) => {
  const sortedAttackingOrder = plannedAttacks.sort(attackingPhaseSort);

  for (let i = 0; i < sortedAttackingOrder.length; i++) {
    const { attackingGroup, defendingGroup } = sortedAttackingOrder[i];
    const damage = effectiveDamage(attackingGroup, defendingGroup);
    const killedUnits = Math.min(Math.floor(damage / defendingGroup.hitPoints), defendingGroup.units);

    print(`${attackingGroup.armyName} group ${attackingGroup.number} attacks defending group ${defendingGroup.number}, killing ${killedUnits} units`);

    defendingGroup.units -= killedUnits;
  }
};

const simulate = (armies) => {
  while (!armies[0].isDead && !armies[1].isDead) {
    printArmyStatus(armies[0]);
    printArmyStatus(armies[1]);

    print('');

    // target selection phase
    const plannedAttacks = [
      ...targetSelectionPhase(armies[1], armies[0]),
      ...targetSelectionPhase(armies[0], armies[1]),
    ];

    // halt if opposing groups are immune to each other
    if (!plannedAttacks.length) {
      return [false, 0];
    }

    print('');

    // attacking phase
    attackingPhase(plannedAttacks);

    print('');
  }

  printArmyStatus(armies[0]);
  printArmyStatus(armies[1]);

  return [
    !armies[0].isDead,
    armies[0].groups.reduce((units, group) => units + group.units, 0),
  ];
};

const boost = (army, amount) => {
  army.groups.forEach((group) => group.attackDamage += amount);
};

module.exports = (input) => {
  let appliedBoost = 1;
  let minimumBoost = appliedBoost;
  let maximumBoost = Infinity;

  while (appliedBoost <= maximumBoost) {
    const armies = parseArmyInformation(input);

    boost(armies[0], appliedBoost);

    const [success, immuneSystemUnitsLeft] = simulate(armies);

    if (!success) {
      minimumBoost = appliedBoost;
      appliedBoost = maximumBoost === Infinity
        ? appliedBoost *= 2
        : Math.floor((maximumBoost - minimumBoost) / 2 + 1) + minimumBoost;
    } else if (appliedBoost < maximumBoost) {
      maximumBoost = appliedBoost;
      appliedBoost = Math.floor((maximumBoost - minimumBoost) / 2 + 1) + minimumBoost;
    } else {
      return immuneSystemUnitsLeft;
    }
  }
};
