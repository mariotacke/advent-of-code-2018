// get array without element at index i
const without = (array, i) => [
  ...array.slice(0, i),
  ...array.slice(i + 1, array.length),
];

const common = (input) => {
  const boxIds = input
    .split('\n')
    .map((x) => x.trim().split(''));

  for (let i = 0; i < boxIds.length; i++) {
    const boxId = boxIds[i];

    for (let n = 0; n < boxId.length; n++) {
      const boxForComparison = without(boxId, n).join('');

      const ids = without(boxIds, i)
        .map((id) => without(id, n).join(''));

      if (ids.some((id) => id === boxForComparison)) {
        return boxForComparison;
      }
    }
  }
};

module.exports = common;
