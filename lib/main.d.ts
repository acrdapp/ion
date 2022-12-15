/// <reference types="mocha" />
export declare function test<T extends Function>(asyncFn: T, suite: any): Mocha.Suite;
export declare function given(...input: any): {
    /** Assert a boolean condition. */
    assert: (assertion: (result?: any) => {}) => any;
    /** Callback is called **before** test.
     * @info Called for *one assertion* only.
     * Called after `Mocha.beforeEach`. */
    before: (cb: () => any) => any;
    /** Assert the expected value deep equals the returned output. */
    expect: (expected: any) => any;
    /** Assert that a promise is not rejected. */
    resolve: () => any;
    /** Assert that a promise resolution deep equals a specific value. */
    resolveWith: (expected: any) => any;
    /** Add a custom message to the next assertion.
     * @info Called for *one assertion* only. */
    message: (content: string) => any;
    /** Assert that a promise is rejected. */
    reject: () => any;
    /** Assert that a promise is rejected with a specific error message. */
    rejectWith: (errorMessage: string) => any;
    /** Assert that an error is thrown. */
    throw: (errorMessage: string) => any;
};
