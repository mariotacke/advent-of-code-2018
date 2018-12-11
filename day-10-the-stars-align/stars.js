const plot = (array) => {
  const minX = Math.min(...array.map((s) => s.positionX));
  const maxX = Math.max(...array.map((s) => s.positionX));
  const minY = Math.min(...array.map((s) => s.positionY));
  const maxY = Math.max(...array.map((s) => s.positionY));

  const grid = Array
    .from({ length: Math.abs(minY - maxY) + 1 })
    .map(() => {
      return Array
        .from({ length: Math.abs(minX - maxX) + 1 })
        .map(() => '.');
    });

  array.forEach((star) => {
    grid[star.positionY - minY][star.positionX - minX] = '#';
  });

  const constellation = grid.map((s) => s.join('')).join('\n');

  return constellation;
};

const simulation = (input) => {
  const stars = input
    .split('\n')
    .map((x) => {
      const parts = x.match(/<(.*)>.*<(.*)>/);

      const position = parts[1].split(',');
      const velocity = parts[2].split(',');

      return {
        positionX: +position[0],
        positionY: +position[1],
        velocityX: +velocity[0],
        velocityY: +velocity[1],
      };
    });

  let height = Infinity;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    for (let i = 0; i < stars.length; i++) {
      stars[i].positionX += stars[i].velocityX;
      stars[i].positionY += stars[i].velocityY;
    }

    const yPositions = stars.map((s) => s.positionY);

    const newHeight = Math.abs(
      Math.min(...yPositions) -
      Math.max(...yPositions)
    );

    if (newHeight < height) {
      height = newHeight;
    } else {
      // undo last step
      for (let i = 0; i < stars.length; i++) {
        stars[i].positionX -= stars[i].velocityX;
        stars[i].positionY -= stars[i].velocityY;
      }

      break;
    }
  }

  return plot(stars);
};

module.exports = simulation;
