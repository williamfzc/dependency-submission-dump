#!/usr/bin/env node
import { handleMain } from './core';

handleMain().catch((error) => {
  console.error(error);
});
