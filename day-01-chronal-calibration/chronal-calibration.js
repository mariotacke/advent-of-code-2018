const calibration = (input) => {
  return input
    .split('\n')
    .map((x) => parseInt(x))
    .reduce((a, b) => a + b, 0);
};

module.exports = calibration;
