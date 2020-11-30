module.exports = (input) => {
  const points = input
    .split('\n')
    .map((line) => line.split(',').map((number) => parseInt(number)));

  const visited = new Set();

  function distance(v0, v1) {
    return v0.reduce((sum, _, i) => sum + Math.abs(v0[i] - v1[i]), 0);
  }

  function search(vector) {
    let members = [vector];

    for (let i = 0; i < points.length; i++) {
      if (distance(vector, points[i]) <= 3 && !visited.has(`${points[i].join(',')}`)) {
        visited.add(`${points[i].join(',')}`);

        members = members.concat(search(points[i]));
      }
    }

    return members;
  }

  const constellations = [];

  for (let i = 0; i < points.length; i++) {
    const vector = points[i];

    if (!visited.has(`${vector.join(',')}`)) {
      visited.add(`${vector.join(',')}`);

      const constellation = search(vector);

      constellations.push(constellation);
    }
  }

  return constellations.length;
};
