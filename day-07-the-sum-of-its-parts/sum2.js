const sum = (input, workers = 5, minimumStepDuration = 60) => {
  const relationships = input
    .split('\n')
    .map((instruction) => {
      const parts = instruction.match(/(\w) must .* step (\w)/);

      return {
        from: parts[1].charCodeAt(0),
        to: parts[2].charCodeAt(0),
      };
    });

  const nodes = [...new Set([
    ...relationships.map(({ from }) => from),
    ...relationships.map(({ to }) => to)
  ])].map((value) => ({
    parents: [],
    value,
  }));

  relationships.forEach(({ from, to }) => {
    nodes.find(({ value}) => value === to).parents.push(from);
  });

  const sequence = [];

  const threads = Array.from({ length: workers }).map(() => {
    return {
      ticks: 0,
      value: null,
    };
  });

  let ticks = 0;

  while (nodes.length) {
    const candidates = nodes
      .filter(({ parents, value }) => !parents.length &&
                                      !threads.some((x) => x.value === value))
      .sort((a, b) => a.value - b.value);

    ticks++;

    threads
      .sort((a, b) => a.value - b.value)
      .forEach((worker) => {
        if (worker.ticks > 0) {
          worker.ticks--;
        }

        if (worker.ticks === 0 && worker.value !== null) {
          sequence.push(worker.value);
          nodes
            .filter(({ parents }) => parents.includes(worker.value))
            .forEach((node) => node.parents = node.parents
              .filter((x) => x !== worker.value));

          nodes.splice(nodes.findIndex((x) => x.value === worker.value), 1);

          worker.value = null;
        }
      });

    for (let i = 0; i < candidates.length; i++) {
      for (let t = 0; t < threads.length; t++) {
        if (threads[t].value === null) {
          threads[t].value = candidates[i].value;
          threads[t].ticks = candidates[i].value - 65 + minimumStepDuration;

          break;
        }
      }
    }
  }

  return ticks;
};

module.exports = sum;
