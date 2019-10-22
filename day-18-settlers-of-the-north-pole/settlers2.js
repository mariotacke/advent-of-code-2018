const crypto = require('crypto');

const countTrees = (acres) => acres.filter((a) => a === '|').length;
const countLumberyards = (acres) => acres.filter((a) => a === '#').length;

const computeNextState = (currentState, adjacentAcres) => {
  const trees = countTrees(adjacentAcres);
  const lumberyards = countLumberyards(adjacentAcres);

  if (currentState === '.' && trees >= 3) {
    return '|';
  }

  if (currentState === '|' && lumberyards >= 3) {
    return '#';
  }

  if (currentState === '#') {
    return lumberyards >= 1 && trees >= 1 ? '#' : '.';
  }

  return currentState;
};

const simulate = (area) => {
  const getAdjacentAcres = (x, y) => {
    const minimumX = x - 1 < 0 ? 0 : x - 1;
    const maximumX = x + 2 > area.length ? area.length : x + 2;
    const acres = [
      ...(area[y - 1] || []).slice(minimumX, maximumX),
      area[y][x - 1],
      area[y][x + 1],
      ...(area[y + 1] || []).slice(minimumX, maximumX),
    ];

    return acres.filter((acre) => acre);
  };

  const output = Array
    .from({ length: area.length })
    .map(() => Array.from({ length: area.length }));

  for (let y = 0; y < area.length; y++) {
    for (let x = 0; x < area.length; x++) {
      const adjacentAcres = getAdjacentAcres(x, y);
      const nextState = computeNextState(area[y][x], adjacentAcres);

      output[y][x] = nextState;
    }
  }

  return output;
};

const computeSimulationHash = (area) => {
  const flattenedArea = area.map((row) => row.join('')).join('');
  const sha1 = crypto.createHash('sha1');

  sha1.update(flattenedArea);

  const hash = sha1.digest('hex');

  return hash;
};

module.exports = (input, simulations = 10) => {
  const previousSimulations = [];

  const simulationArea = input
    .split('\n')
    .map((line) => line
      .trim()
      .split('')
    );

  let output = simulationArea;
  let additionalSimulations = 0;

  const initialHash = computeSimulationHash(output);

  previousSimulations.push(initialHash);

  for (let i = 0; i < simulations; i++) {
    output = simulate(output);

    const hash = computeSimulationHash(output);

    if (previousSimulations.includes(hash)) {
      const firstOccurrence = previousSimulations.indexOf(hash);
      const loopLength = previousSimulations.length - firstOccurrence;
      const remainingSimulations = simulations - i;

      additionalSimulations = remainingSimulations % loopLength;

      break;
    } else {
      previousSimulations.push(hash);
    }
  }

  // simulate remaining mutations
  for (let i = 0; i < additionalSimulations - 1; i++) {
    output = simulate(output);
  }

  const flattenedOutput = [].concat.apply([], output);

  const trees = countTrees(flattenedOutput);
  const lumberyards = countLumberyards(flattenedOutput);

  return trees * lumberyards;
};
