const sustainability = (input) => {
  const lines = input.split('\n');
  const initialState = lines[0]
    .replace('initial state:', '')
    .trim()
    .split('');

  const notes = lines
    .slice(2, lines.length)
    .map((line) => {
      const parts = line.trim().split(' => ');

      return {
        pattern: parts[0],
        outcome: parts[1],
      };
    });

  let offset = 10;
  let state = [
    ...'.'.repeat(offset).split(''),
    ...initialState,
    ...'.'.repeat(offset).split(''),
  ];

  let generations = 0;

  while (generations < 20) {
    let nextState = [...'.'.repeat(state.length).split('')];

    for (let i = 0; i < state.length; i++) {
      const pot = state.slice(i, i + 5).join('');
      const note = notes.find(({ pattern }) => pattern === pot);

      if (note) {
        nextState[i + 2] = note.outcome;
      }
    }

    const i = [...nextState].reverse().indexOf('#');
    const padding = i < 5 ? 5 - i : 0;

    nextState = [...nextState, ...'.'.repeat(padding).split('')];

    state = nextState;
    generations++;
  }

  return state
    .map((x, i) => x === '#' ? i - offset : 0)
    .reduce((a, b) => a + b, 0);
};

module.exports = sustainability;
