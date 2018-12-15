class MineCart {
  constructor (x, y, direction) {
    this.x = x;
    this.y = y;
    this.dx = direction === '<' ? -1 : direction === '>' ? 1 : 0;
    this.dy = direction === '^' ? -1 : direction === 'v' ? 1 : 0;
    this._behavior = 0;
    this._behaviors = [
      'left',
      'straight',
      'right',
    ];
  }

  move (nextSection) {
    this.x += this.dx;
    this.y += this.dy;

    if (/[/\\]/.test(nextSection)) {
      /* eslint-disable indent */
      const direction =
        nextSection === '\\' && this.dx !== 0 ? 'right' :
        nextSection === '/' && this.dx !== 0 ? 'left' :
        nextSection === '\\' && this.dy !== 0 ? 'left' :
        nextSection === '/' && this.dy !== 0 ? 'right' :
        null;
      /* eslint-enable indent */

      this.turn(direction);
    } else if (nextSection === '+') {
      const direction = this._behaviors[this._behavior];

      this._behavior = this._behavior + 1 === this._behaviors.length
        ? 0
        : this._behavior + 1;

      if (direction !== 'straight') {
        this.turn(direction);
      }
    }
  }

  turn (direction) {
    if (this.dx !== 0) {
      this.dy = this.dx * (direction === 'right' ? 1 : -1);
      this.dx = 0;
    } else if (this.dy !== 0) {
      this.dx = this.dy * (direction === 'right' ? -1 : 1);
      this.dy = 0;
    }
  }

  get position () {
    return `${this.x},${this.y}`;
  }
}

const mine = (input) => {
  const width = Math.max(...input.split('\n').map((line) => line.length));
  const tracks = input
    .split('\n')
    .filter((line) => line.trim())
    .map((line) => line.padEnd(width, ' ').split(''));

  let carts = [];

  for (let y = 0; y < tracks.length; y++) {
    for (let x = 0; x < tracks[y].length; x++) {
      if (/[\^v<>]/.test(tracks[y][x])) {
        const marker = tracks[y][x];
        const cart = new MineCart(x, y, marker);

        tracks[y][x] = /[<>]/.test(marker) ? '-' : '|';
        carts.push(cart);
      }
    }
  }

  // eslint-disable-next-line no-constant-condition
  while (carts.length !== 1) {
    const cartsToRemove = [];

    carts.sort((a, b) => a.y - b.y || a.x - b.x);

    for (let i = 0; i < carts.length; i++) {
      const cart = carts[i];
      const nextSection = tracks[cart.y + cart.dy][cart.x + cart.dx];

      cart.move(nextSection);

      const otherCarts = [
        ...carts.slice(0, i),
        ...carts.slice(i + 1, carts.length)
      ];

      const otherCart = otherCarts.find((c) => c.position === cart.position);

      if (otherCart) {
        cartsToRemove.push(cart);
        cartsToRemove.push(otherCart);
      }
    }

    carts = carts.filter((cart) => !cartsToRemove.some(c => c === cart));
  }

  return carts[0].position;
};

module.exports = mine;
