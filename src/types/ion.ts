declare namespace Ion {
  export interface HelperContext {
    fn: any;
    prevMessage?: string;
    curTest?: Mocha.Test;
    prevTest?: Mocha.Test;
    input?: any;
  }

  export interface Given {
    assert(assertion: (result?: any) => boolean): Ion.Given;
    return(expected: any): Ion.Given;
    resolve(): Ion.Given;
    resolveWith(expected: any): Ion.Given;
    message(content: string): Ion.Given;
    reject(): Ion.Given;
    rejectWith(errorMessage: string): Ion.Given;
    throw(errorMessage: string): Ion.Given;
  }

  export interface Helper {
    name: string;
    help(...args: any): Ion.Given;
    getMessage(expected?: any): string;
  }
}