import { assert, expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';

use(chaiAsPromised);

let suites: { [fnName: string]: any } = {};
let prevFn: any;

export function test<T extends Function>(asyncFn: T, suite: any) {
  prevFn = asyncFn;
  suites[prevFn.name] = asyncFn;

  return describe(prevFn.name, suite);
};

let prevMessage: string | null;
let curTest: Mocha.Test | undefined;
let prevTest: Mocha.Test | undefined;

export function given(...input: any) {
  if (prevTest !== curTest) {
    prevMessage = null;
    curTest = prevTest;
  }
  const fn = suites[prevFn.name];

  return {
    assert: (assertion: (result?: ReturnType<typeof fn>) => {}) => {
      const msg = prevMessage ?? givenMessage('assert', input, assertion);
      prevTest = it(msg, async () => {
        const result = await fn(...input);
        assert(assertion(result));
      });
      return given(...input);
    },
    expect: (expected: ReturnType<typeof fn>) => {
      const msg = prevMessage ?? givenMessage('expect', input, expected);
      prevTest = it(msg, async () => {
        const result = await fn(...input);
        expect(result).to.equal(expected);
      });
      return given(...input);
    },
    resolve: async () => {
      const msg = prevMessage ?? givenMessage('resolve', input);
      prevTest = it(msg, async () => {
        const result = () => fn(...input);
        await expect(result()).not.to.be.rejected;
      });
      return given(...input);
    },
    resolveWith: async (expected: ReturnType<typeof fn>) => {
      const msg = prevMessage ?? givenMessage('resolveWith', input, expected);
      prevTest = it(msg, async () => {
        const result = await fn(...input);
        expect(result).to.equal(expected);
      });
      return given(...input);
    },
    message: (content: string) => {
      prevMessage = content;
      return given(...input);
    },
    reject: async () => {
      const msg = prevMessage ?? givenMessage('reject', input);
      prevTest = it(msg, async () => {
        const result = () => fn(...input);
        await expect(result()).to.be.rejected;
      });
      return given(...input);
    },
    rejectWith: async (errorMessage: string) => {
      const msg = prevMessage ?? givenMessage('rejectWith', input, errorMessage);
      prevTest = it(msg, async () => {
        const result = () => fn(...input);
        await expect(result()).to.be.rejectedWith(errorMessage);
      });
      return given(...input);
    },
    throw: (errorMessage: string) => {
      const msg = prevMessage ?? givenMessage('throw', input, errorMessage);
      prevTest = it(msg, () => {
        const result = () => fn(...input);
        expect(result).to.throw(errorMessage);
      });
      return given(...input);
    },
  }
}

function givenMessage(type: keyof ReturnType<typeof given>, input: any, expected?: any): string {
  return {
    assert: `given: ${JSON.stringify(input)}, assert: ${JSON.stringify(expected)}`,
    expect: `given: ${JSON.stringify(input)}, return: ${JSON.stringify(expected)}`,
    resolve: `given: ${JSON.stringify(input)}, resolved`,
    resolveWith: `given: ${JSON.stringify(input)}, resolve: ${JSON.stringify(expected)}`,
    message: prevMessage,
    reject: `given: ${JSON.stringify(input)}, rejected`,
    rejectWith: `given: ${JSON.stringify(input)}, reject: ${JSON.stringify(expected)}`,
    throw: `given: ${JSON.stringify(input)}, throw: ${JSON.stringify(expected)}`,
  }[type]!;
}