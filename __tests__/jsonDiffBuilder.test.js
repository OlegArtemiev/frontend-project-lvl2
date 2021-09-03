import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import { genDiffString } from '../src/jsonDiffBuilder';
import genDiff from '../index';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);
const readFile = (fileName) => readFileSync(getFixturePath(fileName), 'utf-8');

test('genDiffString', () => {
  const beforeJson = JSON.parse(readFile('before.json'));
  const afterJson = JSON.parse(readFile('after.json'));
  const expectedResult = readFile('resultGenDiffString.txt');
  const actualResult = genDiffString(beforeJson, afterJson);
  expect(actualResult).toEqual(expectedResult);
});

test('gendiff .json', () => {
  const expectedResult = readFile('resultGenDiffString.txt');
  const actualResult = genDiff(getFixturePath('before.json'), getFixturePath('after.json'));
  expect(actualResult).toEqual(expectedResult);
});

test('gendiff .yml', () => {
  const expectedResult = readFile('resultGenDiffString.txt');
  const actualResult = genDiff(getFixturePath('before.yml'), getFixturePath('after.yml'));
  expect(actualResult).toEqual(expectedResult);
});

test('gendiff .yaml', () => {
  const expectedResult = readFile('resultGenDiffString.txt');
  const actualResult = genDiff(getFixturePath('before.yaml'), getFixturePath('after.yaml'));
  expect(actualResult).toEqual(expectedResult);
});

test('gendiff json and yaml', () => {
  const expectedResult = readFile('resultGenDiffString.txt');
  const actualResult = genDiff(getFixturePath('before.json'), getFixturePath('after.yaml'));
  expect(actualResult).toEqual(expectedResult);
});
