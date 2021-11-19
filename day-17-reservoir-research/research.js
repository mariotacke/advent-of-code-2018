class Reservoir {
  constructor (clay) {
    const width = Math.max(...clay.map(([x]) => x));
    const height = Math.max(...clay.map(([, y]) => y));

    this._minClayLevel = Math.min(...clay.map(([, y]) => y));

    this._width = width + 1; // +1 to pad for water overflow
    this._height = height;

    this._grid = Array
      .from({ length: this._height + 1 })
      .map(() => Array
        .from({ length: this._width + 1 })
        .map(() => '.'));

    this._grid[0][500] = '+';
    this._marker = [500, 0];
    this._history = [[500, 0]];
    this._done = false;

    // initialize clay distribution
    clay.forEach(([x, y]) => this.set([x, y], '#'));
  }

  print () {
    const minX = this._grid
      .map((row) => row.findIndex((x) => x === '#'))
      .filter((x) => x > -1)
      .sort((a, b) => a - b)[0];

    const slice = this._grid
      .map((row) => row.slice(minX - 1, this._width + 1).join(''))
      .join('\n');

    // eslint-disable-next-line no-console
    console.log(slice);
  }

  get ([x, y]) {
    if (y < 0 || y >= this._grid.length) {
      return null;
    }

    return this._grid[y][x];
  }

  set ([x, y], type) {
    this._grid[y][x] = type;
  }

  goUp () {
    // const isBottom = (tile) => /[#~]/.test(tile);

    // while (!isBottom(this.get([this._marker[0], this._marker[1] + 1]))) {
    //   this._history.shift();
    //   this._marker = this._history[0] || this._marker;
    // }

    while (this.get([this._marker[0], this._marker[1] - 1]) === '|') {
      this._history.shift();
      this._marker = this._history[0];
    }

    if (this._history[0].length === 3) {
      this._history.shift();
      this._marker = this._history[0];
    }
  }

  seekWalls ([x, y]) {
    const isBottom = (tile) => /[#~]/.test(tile);

    const leftWallIndex = this._grid[y].slice(0, x).lastIndexOf('#');
    const rightWallIndex = this._grid[y].slice(x + 1, this._grid[y].length).indexOf('#');

    const leftBottomSlice = this._grid[y + 1].slice(leftWallIndex, x);
    const rightBottomSlice = this._grid[y + 1].slice(x + 1, rightWallIndex + x + 1);

    return [
      leftWallIndex !== -1 ? leftBottomSlice.every(isBottom) : false,
      rightWallIndex !== -1 ? rightBottomSlice.every(isBottom) : false,
    ];
  }

  fillWalls ([x, y]) {
    const leftWallIndex = this._grid[y].slice(0, x).lastIndexOf('#') + 1;
    const rightWallIndex = this._grid[y].slice(x + 1, this._grid[y].length).indexOf('#') - 1;

    for (let i = leftWallIndex; i < x + rightWallIndex + 2; i++) {
      this.set([i, y], '~');
    }
  }

  step () {
    const [x, y] = this._marker;
    const up = [x, y - 1];
    const down = [x, y + 1];
    const left = [x - 1, y];
    const right = [x + 1, y];

    const above = this.get(up);
    const below = this.get(down);
    const leftTile = this.get(left);
    const rightTile = this.get(right);

    if (y + 1 > this._height) {
      this.goUp();
    } else if (/[.]/.test(below)) { // bottom empty
      this.set(down, '|');

      if (this._history[0][0] !== x) {
        this._history.unshift([x, y, true]);
      }

      this._history.unshift(down); // to walk back up later
      this._marker = down;
    } else if (/[#~]/.test(below)) { // hit bottom
      const [hasLeftWall, hasRightWall] = this.seekWalls(this._marker);

      if (hasLeftWall && hasRightWall) {
        this.fillWalls(this._marker);
        this._history.shift();
        this._marker = this._history[0];
      } else if (/[.]/.test(leftTile)) { // left empty
        this.set(left, '|');
        this._marker = left;
      } else if (/[.]/.test(rightTile)) { // right empty
        this.set(right, '|');
        this._marker = right;
      } else if (/[#|]/.test(leftTile)) { // left wall
        // special case: origin next to left wall
        if (this._history[0][0] === this._marker[0] && this._history[0][1] === this._marker[1]) {
          this._history.shift();
        }

        this._marker = this._history[0];
      } else if (/[#|]/.test(rightTile)) { // right wall or blocked
        this._history.shift();
        this._marker = this._history[0];
      }
    } else if (above === '|' && below === '|') {
      // special case: multiple sources for same tile
      if (/[|]/.test(leftTile) || /[|]/.test(rightTile)) {
        this._history.shift();
        this._marker = this._history[0];
      } else {
        this.goUp();
      }
    } else if (above === '+') {
      this._done = true;
    }
  }

  count (elements) {
    return this._grid
      .slice(this._minClayLevel)
      .reduce((total, row) => total + row
        .reduce((sub, element) => sub + (elements.test(element) ? 1 : 0), 0), 0);
  }
}

const parseInput = (input) => {
  return input
    .split('\n')
    .map((line) => {
      const parts = line.trim().match(/(\w)=(\d+), \w=(\d+)\.\.(\d+)/);
      const clay = [];

      for (let i = +parts[3]; i <= +parts[4]; i++) {
        clay.push(parts[1] === 'x' ? [+parts[2], i] : [i, +parts[2]]);
      }

      return clay;
    })
    .reduce((a, b) => [...a, ...b], []);
};

const research = (input) => {
  const clay = parseInput(input);

  const reservoir = new Reservoir(clay);

  while (!reservoir._done) {
    reservoir.step();
  }

  // reservoir.print();

  return [
    reservoir.count(/[|~]/),
    reservoir.count(/[~]/),
  ];
};

module.exports = research;
