const calibration = (input) => {
  const frequencies = new Set([0]);

  const changes = input
    .split('\n')
    .map((x) => parseInt(x));

  let frequency = 0;
  let i = 0;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (i === changes.length) {
      i = 0;

      continue;
    }

    frequency += changes[i];

    if (frequencies.has(frequency)) {
      break;
    }

    frequencies.add(frequency);

    i++;
  }

  return frequency;
};

module.exports = calibration;
