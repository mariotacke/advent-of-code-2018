const assert = require('assert');

const sum = require('./sum');

describe('Day 7: The Sum of Its Parts', () => {
  it('should determine order of steps', () => {
    const instructions =
      `Step C must be finished before step A can begin.
       Step C must be finished before step F can begin.
       Step A must be finished before step B can begin.
       Step A must be finished before step D can begin.
       Step B must be finished before step E can begin.
       Step D must be finished before step E can begin.
       Step F must be finished before step E can begin.`;

    assert.strictEqual(sum(instructions), 'CABDFE');
  });
});
