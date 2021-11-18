import { given, test } from '../../src/main';

function isPrime(num: number) {
  for (var i = 2; i < num; i++) {
    if (num % i === 0) return false;
  }
  return num > 1;
}

test(isPrime, () => {
  given(2).expect(true);
  given(3).expect(true);
  given(4).expect(false);
})