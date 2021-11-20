import { readdirSync } from 'fs';
import { resolve } from 'path';
import { ctx } from '../ctx';

const helpers: Ion.Helper[] = [];

const fileNames = readdirSync(resolve(`${__dirname}/../helpers`));
for (const name of fileNames) {
  if (name.startsWith('_')) continue;
  const Helper = require(`../helpers/${name}`).default;
  helpers.push(new Helper(ctx));
}

export default helpers;