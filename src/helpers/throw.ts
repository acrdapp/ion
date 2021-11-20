import { expect } from 'chai';
import { ctx } from '../ctx';
import given from '../functions/given';

export default class implements Ion.Helper {
  public readonly name = 'throw';
  
  public help(errorMessage: string) {
    const msg = this.getMessage(errorMessage);
    ctx.prevTest = it(msg, () => {
      console.log(ctx.fn)
      const result = ctx.fn(...ctx.input);
      expect(result).to.throw(errorMessage);
    });
    return given(...ctx.input);
  }
  public getMessage(expected: any) {
    return ctx.prevMessage
      ?? `given: ${JSON.stringify(ctx.input)}, throw: ${expected}`;
  }
}