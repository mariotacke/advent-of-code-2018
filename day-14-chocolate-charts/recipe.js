class Node {
  constructor (value, next) {
    this.value = value;
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
      const node = new Node(value, this.head);

      this.head = this.tail = node.next = node;
    } else {
      const node = new Node(value, this.head);

      this.tail.next = node;
      this.tail = node;
    }

    this.length++;
  }
}

const recipe = (input) => {
  const list = new LinkedList();
  const elves = [list.head, list.tail];

  while (list.length < input + 10) {
    `${elves[0].value + elves[1].value}`
      .split('')
      .forEach((value) => list.addToTail(+value));

    for (let e = 0; e < elves.length; e++) {
      const steps = elves[e].value + 1;

      for (let step = 0; step < steps; step++) {
        elves[e] = elves[e].next;
      }
    }
  }

  const scores = [];

  let node = list.tail;

  for (let i = 0; i < input + 10; i++) {
    node = node.next;

    if (i >= input) {
      scores.push(node.value);
    }
  }

  return scores.join('');
};

module.exports = recipe;
