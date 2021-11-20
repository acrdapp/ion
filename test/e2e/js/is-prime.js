import { given, test } from '../../../lib/main';

function isPrime(num) {
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
  given(0).return(false);
  given(2).return(true);
  given(3).return(true);
  given(4).return(false);
})