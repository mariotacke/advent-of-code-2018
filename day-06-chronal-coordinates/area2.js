const distance = (p1, p2) => Math.abs(p2.x - p1.x) + Math.abs(p2.y - p1.y);

const area = (input, limit) => {
  const coordinates = input
    .split('\n')
    .map((x) => {
      const parts = x.split(',');

      return {
        x: +parts[0],
        y: +parts[1],
      };
    });

  const x1 = coordinates.map(({ x }) => x).sort((a, b) => a - b)[0];
  const y1 = coordinates.map(({ y }) => y).sort((a, b) => a - b)[0];
  const x2 = coordinates.map(({ x }) => x).sort((a, b) => b - a)[0];
  const y2 = coordinates.map(({ y }) => y).sort((a, b) => b - a)[0];

  let area = 0;

  for (let y = y1; y < y2; y++) {
    for (let x = x1; x < x2; x++) {
      const totalDistance = coordinates
        .map((coord) => distance({ x, y }, coord))
        .reduce((a, b) => a + b, 0);

      if (totalDistance < limit) {
        area++;
      }
    }
  }

  return area;
};

module.exports = area;
