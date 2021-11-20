import { ctx } from '../ctx';

const suites: { [fnName: string]: any } = {};

export default function<T extends Function>(asyncFn: T, suite: any) {
  ctx.fn = suites[asyncFn.name] = asyncFn;
  return describe(asyncFn.name, suite);
};