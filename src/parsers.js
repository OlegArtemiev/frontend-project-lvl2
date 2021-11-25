import { load } from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yaml: load,
  yml: load,
};

export default (data, ext) => parsers[ext](data);
