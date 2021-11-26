const convertValue = (value) => {
  if (value instanceof Object) {
    return '[complex value]';
  }
  return (typeof value === 'string') ? `'${value}'` : `${value}`;
};

const plain = (tree) => {
  const iter = (node, nodePath) => {
    const lines = node.map(({
      type,
      key,
      newValue = null,
      oldValue = null,
    }) => {
      const currentPath = [...nodePath, key];
      const currenPathString = currentPath.join('.');
      const types = {
        unmodified: () => '',
        deleted: () => `Property '${currenPathString}' was removed`,
        added: () => `Property '${currenPathString}' was added with value: ${convertValue(newValue)}`,
        modified: () => `Property '${currenPathString}' was updated. From ${convertValue(oldValue)} to ${convertValue(newValue)}`,
        compare: () => iter(newValue, currentPath),
      };
      return types[type]();
    }).filter((line) => line !== '');
    return lines.join('\n');
  };
  return iter(tree, []);
};

export default plain;
