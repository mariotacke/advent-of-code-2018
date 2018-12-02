const checksum = (input) => {
  const { twos, threes } = input
    .split('\n')
    .map((x) => {
      const boxId = x.trim().split('');

      const letters = [...new Set(boxId)]
        .map((letter) => boxId.filter((x) => x === letter).length);

      return {
        hasExactlyTwo: letters.includes(2),
        hasExactlyThree: letters.includes(3),
      };
    })
    .reduce((a, { hasExactlyTwo, hasExactlyThree }) => {
      a['twos'] += hasExactlyTwo ? 1 : 0;
      a['threes'] += hasExactlyThree ? 1 : 0;

      return a;
    }, {
      twos: 0,
      threes: 0,
    });

  return twos * threes;
};

module.exports = checksum;
