// modified modulo to accomodate negative values
// from: https://stackoverflow.com/a/17323608/2859367
const mod = (n, m) => ((n % m) + m) % m;

const marble = (input) => {
  const parts = input.match(/(\d+) players; last marble is worth (\d+) points/);

  const numberOfPlayers = +parts[1];
  const numberOfMarbles = +parts[2];
  const circle = [0];

  const players = Array
    .from({ length: numberOfPlayers })
    .reduce((previousValue, currentValue, currentIndex) => {
      previousValue[currentIndex + 1] = 0;

      return previousValue;
    }, {});

  let currentPosition = 0;
  let currentPlayer = 1;

  for (let i = 1; i <= numberOfMarbles; i++) {
    if (i % 23 === 0) {
      const removeAt = mod(currentPosition - 7, circle.length);
      const value = circle.splice(removeAt, 1)[0];

      players[currentPlayer] += i + value;

      currentPosition = removeAt;
    } else {
      const insertAt = (currentPosition + 1) % circle.length + 1;

      circle.splice(insertAt, 0, i);

      currentPosition = insertAt;
    }

    currentPlayer = currentPlayer !== numberOfPlayers ? currentPlayer + 1 : 1;
  }

  return Object.values(players).sort((a, b) => b - a)[0];
};

module.exports = marble;
