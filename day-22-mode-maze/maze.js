module.exports = (input) => {
  const depth = +/depth: (\d+)/.exec(input)[1];
  const target = /target: (\d+),(\d+)/.exec(input).slice(1).map((c) => +c);

  const erosionLevelMap = Array
    .from({ length: target[1] + 1 })
    .map(() => Array.from({ length: target[0] + 1 }));

  const erosionLevel = (geologicIndex) => (geologicIndex + depth) % 20183;

  let riskLevel = 0;

  for (let y = 0; y <= target[1]; y++) {
    for (let x = 0; x <= target[0]; x++) {
      if ((x === 0 && y === 0) || (x === target[0] && y === target[1])) {
        erosionLevelMap[y][x] = 0;
      } else if (y === 0) {
        erosionLevelMap[y][x] = erosionLevel(x * 16807);
      } else if (x === 0) {
        erosionLevelMap[y][x] = erosionLevel(y * 48271);
      } else {
        const geologicIndex = erosionLevelMap[y][x - 1] * erosionLevelMap[y - 1][x];
        erosionLevelMap[y][x] = erosionLevel(geologicIndex);
      }

      riskLevel += erosionLevelMap[y][x] % 3;
    }
  }

  return riskLevel;
};
