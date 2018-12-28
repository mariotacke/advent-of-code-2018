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

const ops = [
  addr,
  addi,
  mulr,
  muli,
  banr,
  bani,
  borr,
  bori,
  setr,
  seti,
  gtir,
  gtri,
  gtrr,
  eqri,
  eqir,
  eqrr,
];

const opcodes = (input) => {
  const lines = input.split('\n').map((line) => line.trim());
  const samples = [];

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('Before:')) {
      const sample = {
        before: lines[i].match(/\[(.*)\]/)[1].split(',').map(Number),
        instruction: lines[i + 1].split(' ').map(Number),
        after: lines[i + 2].match(/\[(.*)\]/)[1].split(',').map(Number),
      };

      samples.push(sample);
    }
  }

  const threeOrMoreOpCodesBehavior = samples
    .filter(({ before, instruction, after }) => {
      const [, a, b, c] = instruction;

      let matchingBehaviors = 0;

      ops.forEach((op) => {
        const registers = [...before];

        registers[c] = op(a, b, registers);

        if (registers.join() === after.join()) {
          matchingBehaviors++;
        }
      });

      return matchingBehaviors >= 3;
    });

  return threeOrMoreOpCodesBehavior.length;
};

module.exports = opcodes;
