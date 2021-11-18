import { assert, expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';

use(chaiAsPromised);

let suites: { [fnName: string]: any } = {};
let prevFn: any;

export function test<T extends Function>(asyncFn: T, suite: any) {
  prevFn = asyncFn;
  suites[prevFn.name] = asyncFn;

  suite();
};

let prevMessage: string;

export function given(...input: any) {
  const fn = suites[prevFn.name];
  return {
    assert: (assertion: (result: ReturnType<typeof fn>) => {}) => {
      const msg = givenMessage('assert', input, assertion);
      it(msg, async () => {
        const result = await fn(...input);
        assert(assertion(result));
      });
      return given(...input);
    },
    expect: (expected: ReturnType<typeof fn>) => {
      const msg = givenMessage('expect', input, expected);
      it(msg, async () => {
        const result = await fn(...input);
        expect(result).to.equal(expected);
      });
      return given(...input);
    },
    expectAsync: async (expected: ReturnType<typeof fn>) => {
      const msg = givenMessage('expectAsync', input, expected);
      it(msg, async () => {
        const result = await fn(...input);
        expect(result).to.equal(expected);
      });
      return given(...input);
    },
    message: async (message: string) => {
      prevMessage = message;
      return given(...input);
    },
    rejectedWith: async (message: string) => {
      const msg = givenMessage('rejectedWith', input, message);
      it(msg, async () => {
        const result = () => fn(...input);
        await expect(result()).to.be.rejectedWith(message);
      });
      return given(...input);
    },
  }
}

function givenMessage(type: keyof ReturnType<typeof given>, input: any, expected: any): string {
  return {
    assert: `given: ${JSON.stringify(input)}, assert: ${JSON.stringify(expected)}`,
    expect: `given: ${JSON.stringify(input)}, return: ${JSON.stringify(expected)}`,
    expectAsync: `given: ${JSON.stringify(input)}, resolve: ${JSON.stringify(expected)}`,
    message: prevMessage,
    rejectedWith: `given: ${JSON.stringify(input)}, reject: ${JSON.stringify(expected)}`,
  }[type];
}