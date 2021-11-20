import { expect } from 'chai';
import { ctx } from '../ctx';
import given from '../functions/given';

export default class implements Ion.Helper {
  public readonly name = 'reject';
  
  public help() {
    const msg = this.getMessage();
    ctx.prevTest = it(msg, async () => {
      const result = () => ctx.fn(...ctx.input);
      await expect(result()).to.be.rejected;
    });
    return given(...ctx.input);
  }
  public getMessage() {
    return ctx.prevMessage
      ?? `given: ${JSON.stringify(ctx.input)}, reject`;
  }
}