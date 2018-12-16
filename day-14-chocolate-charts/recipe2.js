class Node {
  constructor (value, prev, next) {
    this.value = value;
    this.prev = prev;
    this.next = next;
  }
}

class LinkedList {
  constructor () {
    this.head = null;
    this.tail = null;
    this.length = 0;

    this.addToTail(3);
    this.addToTail(7);
  }

  addToTail (value) {
    if (this.tail === null) {
      const node = new Node(value);

      this.head = this.tail = node.prev = node.next = node;
    } else {
      const node = new Node(value, this.tail, this.head);

      this.tail.next = node;
      this.tail = node;
    }

    this.length++;
  }

  indexOf (values) {
    const scores = [];

    let node = this.tail;

    for (let i = 0; i < values.length; i++) {
      scores.unshift(node.value);

      node = node.prev;
    }

    const index = scores.join('').indexOf(values);

    return index !== -1 ? this.length - values.length : -1;
  }
}

const recipe = (input) => {
  const list = new LinkedList();
  const elves = [list.head, list.tail];

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const sum = `${elves[0].value + elves[1].value}`.split('');

    for (let i = 0; i < sum.length; i++) {
      list.addToTail(+sum[i]);

      const position = list.indexOf(input);

      if (position !== -1) {
        return position;
      }
    }

    for (let e = 0; e < elves.length; e++) {
      const steps = elves[e].value + 1;

      for (let step = 0; step < steps; step++) {
        elves[e] = elves[e].next;
      }
    }
  }
};

module.exports = recipe;
