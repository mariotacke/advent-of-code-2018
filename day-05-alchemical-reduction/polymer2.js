const react = (polymer) => {
  let hasReaction = true;
  let chain = polymer;

  restart:
  while (hasReaction) {
    hasReaction = false;

    for (let i = 0; i < chain.length; i++) {
      const pair = chain.slice(i, i + 2);

      if (pair.length === 2 &&
          (pair.charCodeAt(0) === pair.charCodeAt(1) + 32) ||
           pair.charCodeAt(0) === pair.charCodeAt(1) - 32) {

        chain = chain.slice(0, i) + chain.slice(i + 2, chain.length);
        hasReaction = true;

        continue restart;
      }
    }
  }

  return chain.length;
};

const polymer = (input) => {
  return Array
    .from({ length: 26 })
    .map((_, i) => input
      .replace(new RegExp(String.fromCharCode(i + 97), 'g'), '')
      .replace(new RegExp(String.fromCharCode(i + 65), 'g'), ''))
    .map((x) => react(x))
    .sort((a, b) => a - b)[0];
};

module.exports = polymer;
