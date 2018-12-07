// to visualize: http://www.webgraphviz.com/
// eslint-disable-next-line no-unused-vars
const toGraphviz = (relationships) => {
  // eslint-disable-next-line no-console
  console.log('digraph G {\n' + relationships
    .map(({ from, to }) => `"${String.fromCharCode(from)}" -> "${String.fromCharCode(to)}"`)
    .join('\n') + '\n}');
};

const sum = (input) => {
  const relationships = input
    .split('\n')
    .map((instruction) => {
      const parts = instruction.match(/(\w) must .* step (\w)/);

      return {
        from: parts[1].charCodeAt(0),
        to: parts[2].charCodeAt(0),
      };
    });

  // optionally, visualize directed graph
  // toGraphviz(relationships);

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

  while (nodes.length) {
    const candidates = nodes
      .filter(({ parents }) => !parents.length)
      .sort((a, b) => a.value - b.value);

    if (!candidates.length) {
      break;
    }

    const { value } = candidates[0];

    sequence.push(value);
    nodes
      .filter(({ parents }) => parents.includes(value))
      .forEach((node) => node.parents = node.parents
        .filter((x) => x !== value));

    nodes.splice(nodes.findIndex((x) => x.value === value), 1);
  }

  return sequence
    .map((value) => String.fromCharCode(value))
    .join('');
};

module.exports = sum;
