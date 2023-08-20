#!/usr/bin/env node
import { handleMain } from './core';
import { handleDiff } from './diff';

const { program } = require('commander');

program
  .command('dump')
  .description('dump dependency-submission object')
  .action(() => {
    handleMain().catch((error) => {
      console.error(error);
    });
  });

program
  .command('diff')
  .description('diff between dependency-submission')
  .action(() => {
    handleDiff().catch((error) => {
      console.error(error);
    });
  });

program.parse(process.argv);
