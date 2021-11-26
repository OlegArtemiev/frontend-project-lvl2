import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../index';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', `${fileName}`);
const readFile = (fileName) => readFileSync(getFixturePath(fileName), 'utf-8');

const inputFormats = ['json', 'yaml', 'yml'];
const outputFormats = ['stylish', 'plain', 'json'];
inputFormats.forEach((format) => {
  test.each(outputFormats)(`genDiff inputFormat: ${format} outputFormat: %s`, (outputFormat) => {
    const expectedResult = readFile(`expected_${outputFormat}`);
    const actualResult = genDiff(getFixturePath(`before.${format}`), getFixturePath(`after.${format}`), outputFormat);
    expect(actualResult)
      .toEqual(expectedResult);
  });
});

test.each(outputFormats)('genDiff json and yaml outputFormat: %s', (outputFormat) => {
  const expectedResult = readFile(`expected_${outputFormat}`);
  const actualResult = genDiff(getFixturePath('before.json'), getFixturePath('after.yaml'), outputFormat);
  expect(actualResult)
    .toEqual(expectedResult);
});
