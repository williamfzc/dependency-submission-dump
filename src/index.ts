#!/usr/bin/env node
import { handleMain } from './core';

const { program } = require('commander');

program
  .command('dump')
  .description('Description for command1')
  .action(() => {
    handleMain().catch((error) => {
      console.error(error);
    });
  });

program
  .command('diff')
  .description('Description for command2')
  .action(() => {
    console.log('Running command2');
    // 命令2的处理逻辑
  });

program.parse(process.argv);
