const assert = require('assert');

const flow = require('./flow');

describe('Day 19: Go With The Flow', () => {
  it('should output value in register 0 after halting', () => {
    const sample =
      `#ip 0
       seti 5 0 1
       seti 6 0 2
       addi 0 1 0
       addr 1 2 3
       setr 1 0 0
       seti 8 0 4
       seti 9 0 5`;

    assert.strictEqual(flow(sample), 6);
  });
});
