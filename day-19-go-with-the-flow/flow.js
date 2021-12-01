const ops = {
  addr: (a, b, registers) => registers[a] + registers[b],
  addi: (a, b, registers) => registers[a] + b,
  mulr: (a, b, registers) => registers[a] * registers[b],
  muli: (a, b, registers) => registers[a] * b,
  banr: (a, b, registers) => registers[a] & registers[b],
  bani: (a, b, registers) => registers[a] & b,
  borr: (a, b, registers) => registers[a] | registers[b],
  bori: (a, b, registers) => registers[a] | b,
  setr: (a, b, registers) => registers[a],
  seti: (a) => a,
  gtir: (a, b, registers) => a > registers[b] ? 1 : 0,
  gtri: (a, b, registers) => registers[a] > b ? 1 : 0,
  gtrr: (a, b, registers) => registers[a] > registers[b] ? 1 : 0,
  eqir: (a, b, registers) => a === registers[b] ? 1 : 0,
  eqri: (a, b, registers) => registers[a] === b ? 1 : 0,
  eqrr: (a, b, registers) => registers[a] === registers[b] ? 1 : 0,
};

module.exports = (input, registers = [0, 0, 0, 0, 0, 0]) => {
  const lines = input.split('\n');
  const instructions = lines.slice(1).map((line) => {
    const [instruction, ...rest] = line.trim().split(' ');

    return [
      instruction,
      ...rest.map((value) => +value),
    ];
  });

  const instructionPointerRegister = +/#ip (\d)/.exec(lines[0])[1];

  let instructionPointer = 0;

  while (instructionPointer < instructions.length) {
    const [instruction, a, b, c] = instructions[instructionPointer];
    const op = ops[instruction];

    registers[instructionPointerRegister] = instructionPointer;
    registers[c] = op(a, b, registers);
    instructionPointer = registers[instructionPointerRegister];
    instructionPointer++;
  }

  return registers[0];
};
