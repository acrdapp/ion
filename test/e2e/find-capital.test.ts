import { given, test } from '../../src/main';

function findCapital(country: 'UK' | 'France' | 'Antarctica') {
  return new Promise((resolve, reject) => {
    const capital = {
      'Antarctica': 'South Pole',
      'France': 'Paris',
      'Germany': 'Berlin',
      'Italy': 'Rome',
      'UK': 'London',
    }[country];

    setTimeout(() => {
      (capital)
        ? resolve(capital)
        : reject('Country does not exist');
    }, 25)
  });
}

test(findCapital, () => {
  given('').rejectWith('Country does not exist');
  given('Antarctica').resolveWith('South Pole');
  given('Atlantis').rejectWith('Country does not exist');
  given('France').resolveWith('Paris');
  given('UK').resolveWith('London');
  given('Italy').resolveWith('Rome');
});
