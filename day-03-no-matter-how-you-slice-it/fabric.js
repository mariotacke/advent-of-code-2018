class Sheet {
  constructor (width = 1000, height = 1000) {
    this._grid = Array
      .from({ length: height })
      .map(() => Array
        .from({ length: width })
        .map(() => 0));
  }

  reserve (claim) {
    for (let y = 0; y < claim.height; y++) {
      for (let x = 0; x < claim.width; x++) {
        this._grid[y + claim.top][x + claim.left] += 1;
      }
    }
  }

  get reservedSquareInches () {
    return this._grid.reduce((a, b) => {
      return a + b.filter((x) => x >= 2).length;
    }, 0);
  }
}

const fabric = (input, width = 1000, height = 1000) => {
  const sheet = new Sheet(width, height);

  input
    .split('\n')
    .map((x) => {
      const parts = x.match(/#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/);

      return {
        id: +parts[1],
        top: +parts[3],
        left: +parts[2],
        width: +parts[4],
        height: +parts[5],
      };
    })
    .forEach((claim) => sheet.reserve(claim));

  return sheet.reservedSquareInches;
};

module.exports = fabric;
