import { expect } from 'chai';
import { ctx } from '../ctx';
import given from '../functions/given';

export default class implements Ion.Helper {
  public readonly name = 'rejectWith';
  
  public help(errorMessage: string) {
    const msg = this.getMessage(errorMessage);
    ctx.prevTest = it(msg, async () => {
      const result = () => ctx.fn(...ctx.input);
      await expect(result()).to.be.rejectedWith(errorMessage);
    });
    return given(...ctx.input);
  }
  public getMessage(errorMessage: string) {
    return ctx.prevMessage
      ?? `given: ${JSON.stringify(ctx.input)}, reject: ${errorMessage}`;
  }
}