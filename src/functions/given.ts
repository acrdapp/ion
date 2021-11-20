import { ctx } from '../ctx';
import helpers from '../modules/helpers';

export default function(...input: any): Ion.Given {
  ctx.input = input;
  if (ctx.prevTest !== ctx.curTest) {
    delete ctx.prevMessage;
    ctx.curTest = ctx.prevTest;
  } 

  return (helpers as any).reduce((obj: any, helper: Ion.Helper) => ({
    ...obj,
    [helper.name]: helper.help.bind(helper),
  }));
}