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
  let duration = 0;

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
      duration++;
    } else {
      // undo last step
      for (let i = 0; i < stars.length; i++) {
        stars[i].positionX -= stars[i].velocityX;
        stars[i].positionY -= stars[i].velocityY;
      }

      break;
    }
  }

  return duration;
};

module.exports = simulation;
