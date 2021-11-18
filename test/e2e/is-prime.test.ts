import { given, test } from '../../src/main';

function isPrime(num: number) {
  if (num == undefined || Number.isNaN(num))
    throw new TypeError('Invalid number provided');

  for (var i = 2; i < num; i++) {
    if (num % i === 0) return false;
  }
  return num > 1;
}

test(isPrime, () => {
  given().throw('Invalid number provided');
  given(null).throw('Invalid number provided');
  given(0).expect(false);
  given(2).expect(true);
  given(3).expect(true);
  given(4).expect(false);
})