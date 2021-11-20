import { assert } from 'chai';
import { ctx } from '../ctx';
import given from '../functions/given';

export default class implements Ion.Helper {
  public readonly name = 'assert';

  public help(assertion: (result?: any) => boolean) {
    const msg = this.getMessage(assertion);
    ctx.prevTest = it(msg, async () => {
      const result = await ctx.fn(...ctx.input);
      const assertResult = assertion(result);
      assert(assertResult, `returned ${assertResult}`);
    });
    return given(...ctx.input);
  }

  public getMessage(expected?: any) {
    return ctx.prevMessage
      ?? `given: ${JSON.stringify(ctx.input)}, assert: ${JSON.stringify(expected)}`;
  }
}