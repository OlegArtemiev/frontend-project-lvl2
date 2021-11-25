import _ from 'lodash';
import format from './formatters.js';

const buildAst = (data1, data2) => {
  const keys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));
  const func = (key) => {
    if ((data1[key] instanceof Object) && (data2[key] instanceof Object)) {
      return {
        type: 'compare',
        key,
        newValue: buildAst(data1[key], data2[key]),
      };
    }
    if (!_.has(data1, key)) {
      return {
        type: 'added',
        key,
        newValue: data2[key],
      };
    }
    if (!_.has(data2, key)) {
      return {
        type: 'deleted',
        key,
        oldValue: data1[key],
      };
    }
    if (data1[key] === data2[key]) {
      return {
        type: 'unmodified',
        key,
        oldValue: data1[key],
      };
    }
    return {
      type: 'modified',
      key,
      oldValue: data1[key],
      newValue: data2[key],
    };
  };
  return keys.map(func);
};

export default (data1, data2, formatType) => format(buildAst(data1, data2), formatType);
