import { expect } from 'chai';
import { ctx } from '../ctx';
import given from '../functions/given';

export default class implements Ion.Helper {
  public readonly name = 'resolveWith';
  
  public help(expected: any) {
    const msg = this.getMessage(expected);
    ctx.prevTest = it(msg, async () => {
      const result = () => ctx.fn(...ctx.input);
      await expect(result()).to.eventually.equal(expected);
    });
    return given(...ctx.input);
  }
  public getMessage(expected: any) {
    return ctx.prevMessage
      ?? `given: ${JSON.stringify(ctx.input)}, resolve: ${expected}`;
  }
}