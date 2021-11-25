#!/usr/bin/env node

import { program } from 'commander';
import genDiffString from '../index.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.1')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const outputFormat = program.opts().format;
    console.log(genDiffString(filepath1, filepath2, outputFormat));
  });

program.parse();
