const tab = '    ';
const unmodifiedPrefix = tab;
const deletedPrefix = '  - ';
const addedPrefix = '  + ';

const stringify = (value, level) => {
  const iter = (currentValue, depth) => {
    if (!(currentValue instanceof Object)) {
      return `${currentValue}`;
    }
    const indentSize = depth + 2;
    const currentIndent = tab.repeat(indentSize);
    const bracketIndent = tab.repeat(indentSize - 1);
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`);
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };
  return iter(value, level);
};

const stylish = (tree) => {
  const iter = (nodeTree, depth) => {
    const indent = tab.repeat(depth);
    const lines = nodeTree.map(({
      type,
      key,
      newValue = null,
      oldValue = null,
    }) => {
      const types = {
        unmodified: () => `${indent}${unmodifiedPrefix}${key}: ${stringify(oldValue, depth)}`,
        deleted: () => `${indent}${deletedPrefix}${key}: ${stringify(oldValue, depth)}`,
        added: () => `${indent}${addedPrefix}${key}: ${stringify(newValue, depth)}`,
        modified: () => `${indent}${deletedPrefix}${key}: ${stringify(oldValue, depth)}\n${indent}${addedPrefix}${key}: ${stringify(newValue, depth)}`,
        compare: () => `${indent}${unmodifiedPrefix}${key}: ${iter(newValue, depth + 1)}`,
      };
      return types[type]();
    });
    return [
      '{',
      ...lines,
      `${indent}}`,
    ].join('\n');
  };
  return iter(tree, 0);
};

export default stylish;
