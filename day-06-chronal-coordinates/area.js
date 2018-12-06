const distance = (p1, p2) => Math.abs(p2.x - p1.x) + Math.abs(p2.y - p1.y);

const area = (input) => {
  const coordinates = input
    .split('\n')
    .map((x) => {
      const parts = x.split(',');

      return {
        x: +parts[0],
        y: +parts[1],
        points: [],
      };
    });

  const x1 = coordinates.map(({ x }) => x).sort((a, b) => a - b)[0];
  const y1 = coordinates.map(({ y }) => y).sort((a, b) => a - b)[0];
  const x2 = coordinates.map(({ x }) => x).sort((a, b) => b - a)[0];
  const y2 = coordinates.map(({ y }) => y).sort((a, b) => b - a)[0];

  for (let y = y1; y < y2; y++) {
    for (let x = x1; x < x2; x++) {
      const distances = coordinates
        .map((origin) => {
          return {
            x: origin.x,
            y: origin.y,
            distance: distance(origin, { x, y }),
          };
        })
        .sort((a, b) => a.distance - b.distance);

      if (distances[0].distance < distances[1].distance) {
        coordinates
          .find((coord) => coord.x === distances[0].x &&
                           coord.y === distances[0].y)
          .points.push({ x, y });
      }
    }
  }

  const innerAreas = coordinates
    .filter(({ points }) => points
      .every(({ x, y }) => x > x1 && x < x2 && y > y1 && y < y2));

  return Math.max(...innerAreas.map(({ points }) => points.length));
};

module.exports = area;
