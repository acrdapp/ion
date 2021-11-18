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

test(findCapital, async () => {
  given('').rejectedWith('Country does not exist');
  given('Antarctica').expectAsync('South Pole');
  given('Atlantis').rejectedWith('Country does not exist');
  given('France').expectAsync('Paris');
  given('UK').expectAsync('London');
  given('Italy').expectAsync('Rome');
});
