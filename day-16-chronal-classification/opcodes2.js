const addr = (a, b, registers) => registers[a] + registers[b];
const addi = (a, b, registers) => registers[a] + b;
const mulr = (a, b, registers) => registers[a] * registers[b];
const muli = (a, b, registers) => registers[a] * b;
const banr = (a, b, registers) => registers[a] & registers[b];
const bani = (a, b, registers) => registers[a] & b;
const borr = (a, b, registers) => registers[a] | registers[b];
const bori = (a, b, registers) => registers[a] | b;
const setr = (a, b, registers) => registers[a];
const seti = (a) => a;
const gtir = (a, b, registers) => a > registers[b] ? 1 : 0;
const gtri = (a, b, registers) => registers[a] > b ? 1 : 0;
const gtrr = (a, b, registers) => registers[a] > registers[b] ? 1 : 0;
const eqir = (a, b, registers) => a === registers[b] ? 1 : 0;
const eqri = (a, b, registers) => registers[a] === b ? 1 : 0;
const eqrr = (a, b, registers) => registers[a] === registers[b] ? 1 : 0;

const opcodes = (input) => {
  const lines = input.split('\n').map((line) => line.trim());

  let samples = [];

  let programStart = 0;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('Before:')) {
      const sample = {
        before: lines[i].match(/\[(.*)\]/)[1].split(',').map(Number),
        instruction: lines[i + 1].split(' ').map(Number),
        after: lines[i + 2].match(/\[(.*)\]/)[1].split(',').map(Number),
      };

      samples.push(sample);
    }

    if (!lines[i].length && !lines[i + 2].length) {
      programStart = i + 3;
    }
  }

  const sortedOps = Array.from({ length: 16 });
  const ops = [
    addr, addi,
    mulr, muli,
    banr, bani,
    borr, bori,
    setr, seti,
    gtir, gtri, gtrr,
    eqri, eqir, eqrr,
  ];

  let i = 0;

  while (ops.length) {
    const op = ops[i];

    const matchingSamples = samples
      .filter(({ before, instruction, after }) => {
        const [, a, b, c] = instruction;
        const registers = [...before];

        registers[c] = op(a, b, registers);

        return registers.join() === after.join();
      });

    const opCodes = new Set(matchingSamples.map(({ instruction }) => instruction[0]));

    if (opCodes.size === 1) {
      const opCode = [...opCodes][0];

      sortedOps[opCode] = op;

      ops.splice(i, 1);
      samples = samples.filter(({ instruction }) => instruction[0] !== opCode);
    }

    i++;

    if (i >= ops.length) {
      i = 0;
    }
  }

  const registers = [0, 0, 0, 0];

  lines
    .slice(programStart, lines.length)
    .map((line) => line.split(' ').map(Number))
    .forEach((instruction) => {
      const [opCode, a, b, c] = instruction;

      registers[c] = sortedOps[opCode](a, b, registers);
    });

  return registers;
};

module.exports = opcodes;
