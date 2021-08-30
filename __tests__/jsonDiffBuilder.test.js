import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import { genDiffString } from '../src/jsonDiffBuilder';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);
const readFile = (fileName) => readFileSync(getFixturePath(fileName), 'utf-8');

test('genDiffString', () => {
  const beforeJson = JSON.parse(readFile('before.json'));
  const afterJson = JSON.parse(readFile('after.json'));
  const expextedResult = readFile('resultGenDiffString.txt');
  const actualResult = genDiffString(beforeJson, afterJson);
  expect(actualResult).toEqual(expextedResult);
});
