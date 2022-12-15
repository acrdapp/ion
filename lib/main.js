"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.given = exports.test = void 0;
const chai_1 = require("chai");
const chai_as_promised_1 = __importDefault(require("chai-as-promised"));
(0, chai_1.use)(chai_as_promised_1.default);
let functions = {};
let prevFn;
function test(asyncFn, suite) {
    prevFn = asyncFn;
    functions[prevFn.name] = asyncFn;
    return describe(prevFn.name, suite);
}
exports.test = test;
;
let prevMessage;
let curTest;
let prevTest;
let beforeTest = {};
function given(...input) {
    var _a;
    if (prevTest !== curTest) {
        prevMessage = undefined;
        curTest = prevTest;
    }
    const fn = functions[prevFn.name];
    const prevTestId = (_a = prevTest === null || prevTest === void 0 ? void 0 : prevTest.id) !== null && _a !== void 0 ? _a : 0;
    const getMsg = (action, expected) => prevMessage !== null && prevMessage !== void 0 ? prevMessage : givenMessage(action, input, expected);
    return {
        /** Assert a boolean condition. */
        assert: (assertion) => {
            prevTest = it(getMsg('assert', assertion), () => __awaiter(this, void 0, void 0, function* () {
                var _a;
                yield ((_a = beforeTest[prevTestId]) === null || _a === void 0 ? void 0 : _a.call(beforeTest));
                const result = yield fn(...input);
                (0, chai_1.assert)(assertion(result));
            }));
            return given(...input);
        },
        /** Callback is called **before** test.
         * @info Called for *one assertion* only.
         * Called after `Mocha.beforeEach`. */
        before: (cb) => {
            beforeTest[prevTestId] = cb;
            return given(...input);
        },
        /** Assert the expected value deep equals the returned output. */
        expect: (expected) => {
            prevTest = it(getMsg('expect', expected), () => __awaiter(this, void 0, void 0, function* () {
                var _a;
                yield ((_a = beforeTest[prevTestId]) === null || _a === void 0 ? void 0 : _a.call(beforeTest));
                const result = yield fn(...input);
                (0, chai_1.expect)(result).to.deep.equal(expected);
            }));
            return given(...input);
        },
        /** Assert that a promise is not rejected. */
        resolve: () => {
            prevTest = it(getMsg('resolve'), () => __awaiter(this, void 0, void 0, function* () {
                var _a;
                yield ((_a = beforeTest[prevTestId]) === null || _a === void 0 ? void 0 : _a.call(beforeTest));
                const result = () => fn(...input);
                yield (0, chai_1.expect)(result()).not.to.be.rejected;
            }));
            return given(...input);
        },
        /** Assert that a promise resolution deep equals a specific value. */
        resolveWith: (expected) => {
            prevTest = it(getMsg('resolveWith', expected), () => __awaiter(this, void 0, void 0, function* () {
                var _a;
                yield ((_a = beforeTest[prevTestId]) === null || _a === void 0 ? void 0 : _a.call(beforeTest));
                const result = yield fn(...input);
                (0, chai_1.expect)(result).to.deep.equal(expected);
            }));
            return given(...input);
        },
        /** Add a custom message to the next assertion.
         * @info Called for *one assertion* only. */
        message: (content) => {
            prevMessage = content;
            return given(...input);
        },
        /** Assert that a promise is rejected. */
        reject: () => {
            prevTest = it(getMsg('reject'), () => __awaiter(this, void 0, void 0, function* () {
                var _a;
                yield ((_a = beforeTest[prevTestId]) === null || _a === void 0 ? void 0 : _a.call(beforeTest));
                const result = () => fn(...input);
                yield (0, chai_1.expect)(result()).to.be.rejected;
            }));
            return given(...input);
        },
        /** Assert that a promise is rejected with a specific error message. */
        rejectWith: (errorMessage) => {
            prevTest = it(getMsg('rejectWith', errorMessage), () => __awaiter(this, void 0, void 0, function* () {
                var _a;
                yield ((_a = beforeTest[prevTestId]) === null || _a === void 0 ? void 0 : _a.call(beforeTest));
                const result = () => fn(...input);
                yield (0, chai_1.expect)(result()).to.be.rejectedWith(errorMessage);
            }));
            return given(...input);
        },
        /** Assert that an error is thrown. */
        throw: (errorMessage) => {
            prevTest = it(getMsg('throw', errorMessage), () => __awaiter(this, void 0, void 0, function* () {
                var _a;
                yield ((_a = beforeTest[prevTestId]) === null || _a === void 0 ? void 0 : _a.call(beforeTest));
                const result = () => fn(...input);
                (0, chai_1.expect)(result).to.throw(errorMessage);
            }));
            return given(...input);
        },
    };
}
exports.given = given;
function givenMessage(type, input, expected) {
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
    }[type];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtCQUEyQztBQUMzQyx3RUFBOEM7QUFFOUMsSUFBQSxVQUFHLEVBQUMsMEJBQWMsQ0FBQyxDQUFDO0FBRXBCLElBQUksU0FBUyxHQUE4QixFQUFFLENBQUM7QUFDOUMsSUFBSSxNQUFXLENBQUM7QUFFaEIsU0FBZ0IsSUFBSSxDQUFxQixPQUFVLEVBQUUsS0FBVTtJQUM3RCxNQUFNLEdBQUcsT0FBTyxDQUFDO0lBQ2pCLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDO0lBRWpDLE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDdEMsQ0FBQztBQUxELG9CQUtDO0FBQUEsQ0FBQztBQUVGLElBQUksV0FBK0IsQ0FBQztBQUNwQyxJQUFJLE9BQStCLENBQUM7QUFDcEMsSUFBSSxRQUFnQyxDQUFDO0FBQ3JDLElBQUksVUFBVSxHQUF1RCxFQUFFLENBQUM7QUFJeEUsU0FBZ0IsS0FBSyxDQUFDLEdBQUcsS0FBVTs7SUFDakMsSUFBSSxRQUFRLEtBQUssT0FBTyxFQUFFO1FBQ3hCLFdBQVcsR0FBRyxTQUFTLENBQUM7UUFDeEIsT0FBTyxHQUFHLFFBQVEsQ0FBQztLQUNwQjtJQUNELE1BQU0sRUFBRSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsTUFBTSxVQUFVLEdBQUcsTUFBQyxRQUFnQixhQUFoQixRQUFRLHVCQUFSLFFBQVEsQ0FBVSxFQUFFLG1DQUFJLENBQUMsQ0FBQztJQUU5QyxNQUFNLE1BQU0sR0FBRyxDQUFDLE1BQWMsRUFBRSxRQUFjLEVBQUUsRUFBRSxDQUFDLFdBQVcsYUFBWCxXQUFXLGNBQVgsV0FBVyxHQUFJLFlBQVksQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFF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