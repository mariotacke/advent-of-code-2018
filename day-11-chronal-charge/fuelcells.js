const length = 300;

class FuelCellGrid {
  constructor (serialNumber, length = 300) {
    this.serialNumber = serialNumber;

    this._grid = Array
      .from({ length })
      .map(() => Array
        .from({ length }));

    for (let y = 1; y <= length; y++) {
      for (let x = 1; x <= length; x++) {
        const rackId = x + 10;

        let powerLevel = rackId * y;

        powerLevel += this.serialNumber;
        powerLevel *= rackId;
        powerLevel = +(`${powerLevel}`.split('').reverse()[2] || 0);
        powerLevel -= 5;

        this._grid[y - 1][x - 1] = powerLevel;
      }
    }
  }

  getSection (topLeftX, topLeftY) {
    let powerLevel = 0;

    for (let y = topLeftY - 1; y <= topLeftY + 1; y++) {
      for (let x = topLeftX - 1; x <= topLeftX + 1; x++) {
        powerLevel += this._grid[y][x];
      }
    }

    return powerLevel;
  }
}

const search = (serialNumber) => {
  const grid = new FuelCellGrid(serialNumber, length);

  let maximumPowerLevel = -Infinity;
  let coordinate = null;

  for (let y = 1; y <= length - 3; y++) {
    for (let x = 1; x <= length - 3; x++) {
      const powerLevel = grid.getSection(x, y);

      if (powerLevel > maximumPowerLevel) {
        maximumPowerLevel = powerLevel;

        coordinate = `${x},${y}`;
      }
    }
  }

  return coordinate;
};

module.exports = search;
