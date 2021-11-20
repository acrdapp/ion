import { expect } from 'chai';
import { ctx } from '../ctx';
import given from '../functions/given';

export default class implements Ion.Helper {
  public readonly name = 'return';
  
  public help(expected: any) {    
    const msg = this.getMessage(expected);
    ctx.prevTest = it(msg, () => {      
      const result = ctx.fn(...ctx.input);
      expect(result).to.equal(expected);
    });
    return given(...ctx.input);
  }
  public getMessage(expected?: any) {
    return ctx.prevMessage
      ?? `given: ${JSON.stringify(ctx.input)}, return: ${JSON.stringify(expected)}`;
  }
}