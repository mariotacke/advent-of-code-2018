class Unit {
  constructor (x, y, map, units, defaultElfAttackPoints = 3) {
    this.x = x;
    this.y = y;
    this.type = map[y][x];
    this.hp = 200;
    this.ap = this.type === 'E' ? defaultElfAttackPoints : 3;

    this._map = map;
    this._units = units;
  }

  get alive() {
    return this.hp > 0;
  }

  _getAdjecentSquares () {
    const adjecentSquares = [
      { x: this.x - 1, y: this.y },
      { x: this.x + 1, y: this.y },
      { x: this.x, y: this.y - 1 },
      { x: this.x, y: this.y + 1 },
    ];

    return adjecentSquares.filter(({ x, y }) => this._map[y][x]);
  }

  getOpenPositions () {
    return this._getAdjecentSquares()
      .filter(({ x, y }) => this._map[y][x] === '.');
  }

  attack () {
    const enemy = this.getAdjecentEnemies()
      .sort((a, b) => a.hp - b.hp || a.y - b.y || a.x - b.x)[0];

    enemy.hp -= this.ap;

    if (!enemy.alive) {
      this._map[enemy.y][enemy.x] = '.';
      enemy.x = Infinity;
      enemy.y = Infinity;
    }
  }

  move ({ x, y }) {
    this._map[this.y][this.x] = '.';
    this._map[y][x] = this.type;
    this.x = x;
    this.y = y;
  }

  getAdjecentEnemies () {
    const enemyType = this.type === 'E' ? 'G' : 'E';

    const adjecent = this._getAdjecentSquares()
      .filter(({ x, y }) => this._map[y][x] === enemyType)
      .map(({ x, y }) => this._units
        .find((unit) => unit.x === x && unit.y === y))
      .filter((unit) => unit.alive);

    return adjecent;
  }
}

const fill = (position, map) => {
  const matrix = map
    .map((row) => [...row]
      .map((point) => point === '.' ? null : Infinity));

  matrix[position.y][position.x] = 0;

  let isStuck = false;

  while (!isStuck) {
    isStuck = true;

    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix[y].length; x++) {
        if (Number.isFinite(matrix[y][x])) {
          [
            { x: x - 1, y: y },
            { x: x + 1, y: y },
            { x: x, y: y - 1 },
            { x: x, y: y + 1 },
          ]
            .filter((position) => matrix[position.y][position.x] === null)
            .forEach((position) => {
              isStuck = false;
              matrix[position.y][position.x] = matrix[y][x] + 1;
            });
        }
      }
    }
  }

  return matrix;
};

const simulateCombat = (input, defaultElfAttackPoints = 3) => {
  const map = input
    .split('\n')
    .map((row) => row.split(''));

  const units = [];

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (/[EG]/.test(map[y][x])) {
        units.push(new Unit(x, y, map, units, defaultElfAttackPoints));
      }
    }
  }

  let round = 0;
  let failed = false;

  simulation:
  while (round++ < Infinity) {
    units.sort((a, b) => a.y - b.y || a.x - b.x);

    for (let i = 0; i < units.length; i++) {
      const unit = units[i];

      if (!unit.alive) {
        continue;
      }

      const enemyUnits = units
        .filter((enemy) => enemy.alive && unit.type !== enemy.type);

      if (!enemyUnits.length) {
        break simulation;
      }

      if (!unit.getAdjecentEnemies().length) {
        const possibleTargets = enemyUnits
          .map((u) => u.getOpenPositions())
          .reduce((a, b) => [...a, ...b], [])
          .reduce((a, b) => {
            if (!a.some((s) => s.x === b.x && s.y === b.y)) {
              a.push(b);
            }

            return a;
          }, [])
          .map((position) => {
            const matrix = fill(position, map);

            return {
              matrix,
              position,
            };
          });

        const nearest = unit.getOpenPositions()
          .map((step) => {
            const distances = possibleTargets
              .filter(({ matrix }) => Number.isFinite(matrix[step.y][step.x]))
              .map(({ matrix }) => matrix[step.y][step.x]);

            return {
              distance: Math.min(...distances),
              step,
            };
          })
          .filter(({ distance }) => distance !== Infinity)
          .sort((a, b) => a.distance - b.distance ||
                          a.step.y - b.step.y ||
                          a.step.x - b.step.x);

        if (nearest.length) {
          unit.move(nearest[0].step);
        }
      }

      if (unit.getAdjecentEnemies().length) {
        unit.attack();

        const elves = units.filter(({ type }) => type === 'E');

        if (!elves.every((u) => u.alive)) {
          failed = true;

          break;
        }
      }
    }
  }

  return failed ? Infinity : (round - 1) * units
    .filter((unit) => unit.alive)
    .map((unit) => unit.hp)
    .reduce((a, b) => a + b, 0);
};

const poweredUpGame = (input) => {
  for (let ap = 4; ap < Infinity; ap++) {
    const outcome = simulateCombat(input, ap);

    if (outcome !== Infinity) {
      return outcome;
    }
  }
};

module.exports = poweredUpGame;
