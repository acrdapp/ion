import { ctx } from '../ctx';
import given from '../functions/given';

export default class implements Ion.Helper {
  public readonly name = 'message';
  
  public help(message: string) {
    ctx.prevMessage = this.getMessage(message);
    return given(...ctx.input);
  }
  public getMessage(message: string) {
    return message;
  }
}