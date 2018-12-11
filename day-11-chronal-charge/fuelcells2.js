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

  getSection (topLeftX, topLeftY, length) {
    let powerLevel = 0;

    for (let y = topLeftY - 1; y <= topLeftY + length - 1; y++) {
      for (let x = topLeftX - 1; x <= topLeftX + length - 1; x++) {
        powerLevel += this._grid[y][x];
      }
    }

    return powerLevel;
  }
}

const search = (serialNumber) => {
  const length = 300;

  const grid = new FuelCellGrid(serialNumber, length);

  let maximumPowerLevel = -Infinity;
  let identifier = null;

  for (let size = 1; size <= 300; size++) {
    for (let y = 1; y <= length - size; y++) {
      for (let x = 1; x <= length - size; x++) {
        const powerLevel = grid.getSection(x, y, size);

        if (powerLevel > maximumPowerLevel) {
          maximumPowerLevel = powerLevel;
          identifier = `${x},${y},${size + 1}`;
        }
      }
    }
  }

  return identifier;
};

module.exports = search;
