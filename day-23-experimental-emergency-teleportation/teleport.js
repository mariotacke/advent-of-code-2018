function distance(v0, v1) {
  return v0.reduce((sum, _, i) => sum + Math.abs(v0[i] - v1[i]), 0);
}

module.exports = (input) => {
  const nanobots = input.split('\n').map((line) => {
    return {
      vector: /<(.*)>/.exec(line)[1].split(',').map((value) => parseInt(value)),
      radius: parseInt(/r=(\d+)/.exec(line)[1]),
    };
  });

  const { vector, radius } = nanobots.sort((a, b) => b.radius - a.radius)[0];

  return nanobots.reduce((numberInRange, { vector: otherVector }) => {
    return numberInRange + (distance(vector, otherVector) <= radius ? 1 : 0);
  }, 0);
};
