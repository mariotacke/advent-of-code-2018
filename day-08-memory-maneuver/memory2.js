const getValue = ({ children, metadata }) => {
  let value = 0;

  if (children.length) {
    metadata.forEach((index) => {
      const child = children[index - 1];

      if (child) {
        value += getValue(child);
      }
    });
  } else {
    value += metadata.reduce((a, b) => a + b, 0);
  }

  return value;
};

const nodeLength = ({ children, metadata }) => {
  let length = 0;

  if (children.length) {
    children.forEach((child) => {
      length += nodeLength(child);
    });
  }

  return 2 + length + metadata.length;
};

const parse = (parts) => {
  const childNodes = parts[0];
  const metadataEntries = parts[1];

  const children = [];

  let position = 2;

  if (childNodes > 0) {
    for (let i = 0; i < childNodes; i++) {
      const innerParts = parts.slice(position, parts.length);
      const node = parse(innerParts);

      position += nodeLength(node);

      children.push(node);
    }
  }

  const metadata = parts.slice(position, position + metadataEntries);

  return {
    children,
    metadata,
  };
};

const memory = (input) => {
  const parts = input.split(' ').map(Number);

  const tree = parse(parts);

  return getValue(tree);
};

module.exports = memory;
