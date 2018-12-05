const polymer = (input) => {
  let hasReaction = true;
  let chain = input;

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

module.exports = polymer;
