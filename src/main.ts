import { assert, expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';

use(chaiAsPromised);

let functions: { [fnName: string]: any } = {};
let prevFn: any;

export function test<T extends Function>(asyncFn: T, suite: any) {
  prevFn = asyncFn;
  functions[prevFn.name] = asyncFn;

  return describe(prevFn.name, suite);
};

let prevMessage: string | undefined;
let curTest: Mocha.Test | undefined;
let prevTest: Mocha.Test | undefined;
let beforeTest: { [id: string]: (() => Promise<any>) | undefined } = {};

type Action = keyof ReturnType<typeof given>;

export function given(...input: any) {
  if (prevTest !== curTest) {
    prevMessage = undefined;
    curTest = prevTest;
  }
  const fn = functions[prevFn.name];
  const prevTestId = (prevTest as any)?.id ?? 0;

  const getMsg = (action: Action, expected?: any) => prevMessage ?? givenMessage(action, input, expected);

  return {
    /** Assert a boolean condition. */
    assert: (assertion: (result?: ReturnType<typeof fn>) => {}) => {
      prevTest = it(getMsg('assert', assertion), async () => {
        await beforeTest[prevTestId]?.();
        const result = await fn(...input);
        assert(assertion(result));
      });
      return given(...input);
    },
    /** Callback is called **before** test.
     * @info Called for *one assertion* only.
     * Called after `Mocha.beforeEach`. */
    before: (cb: () => any) => {
      beforeTest[prevTestId] = cb;
      return given(...input);
    },
    /** Assert the expected value deep equals the returned output. */
    expect: (expected: ReturnType<typeof fn>) => {
      prevTest = it(getMsg('expect', expected), async () => {
        await beforeTest[prevTestId]?.();
        const result = await fn(...input);
        expect(result).to.deep.equal(expected);
      });
      return given(...input);
    },
    /** Assert that a promise is not rejected. */
    resolve: () => {
      prevTest = it(getMsg('resolve'), async () => {
        await beforeTest[prevTestId]?.();
        const result = () => fn(...input);
        await expect(result()).not.to.be.rejected;
      });
      return given(...input);
    },
    /** Assert that a promise resolution deep equals a specific value. */
    resolveWith: (expected: ReturnType<typeof fn>) => {
      prevTest = it(getMsg('resolveWith', expected), async () => {        
        await beforeTest[prevTestId]?.();
        const result = await fn(...input);
        expect(result).to.deep.equal(expected);
      });
      return given(...input);
    },
    /** Add a custom message to the next assertion.
     * @info Called for *one assertion* only. */
    message: (content: string) => {
      prevMessage = content;
      return given(...input);
    },
    /** Assert that a promise is rejected. */
    reject: () => {
      prevTest = it(getMsg('reject'), async () => {
        await beforeTest[prevTestId]?.();
        const result = () => fn(...input);
        await expect(result()).to.be.rejected;
      });
      return given(...input);
    },
    /** Assert that a promise is rejected with a specific error message. */
    rejectWith: (errorMessage: string) => {
      prevTest = it(getMsg('rejectWith', errorMessage), async () => {
        await beforeTest[prevTestId]?.();
        console.log('before');
        
        const result = () => fn(...input);
        await expect(result()).to.be.rejectedWith(errorMessage);
        console.log('after');
        
      });
      return given(...input);
    },
    /** Assert that an error is thrown. */
    throw: (errorMessage: string) => {
      prevTest = it(getMsg('throw', errorMessage), async () => {
        await beforeTest[prevTestId]?.();
        const result = () => fn(...input);
        expect(result).to.throw(errorMessage);
      });
      return given(...input);
    },
  }
}

function givenMessage(type: Action, input: any, expected?: any): string {
  const given = (input.length) ? JSON.stringify(input) : '()'; 
  return {
    assert: `given: ${given}, assert: ${JSON.stringify(expected)}`,
    before: prevMessage,
    expect: `given: ${given}, return: ${JSON.stringify(expected)}`,
    resolve: `given: ${given}, resolved`,
    resolveWith: `given: ${given}, resolve: ${JSON.stringify(expected)}`,
    message: prevMessage,
    reject: `given: ${given}, rejected`,
    rejectWith: `given: ${given}, reject: ${JSON.stringify(expected)}`,
    throw: `given: ${given}, throw: ${JSON.stringify(expected)}`,
  }[type]!;
}