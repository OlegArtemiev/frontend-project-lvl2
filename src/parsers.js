import { load } from 'js-yaml';

const getParser = (ext) => {
  switch (ext) {
    case '.yml':
    case '.yaml':
      return load;
    default:
      return JSON.parse;
  }
};

export default (data, ext) => {
  const parse = getParser(ext);
  return parse(data);
};
