import { given, test } from '../../src/main';

let previous: any;

function getPrevious() {
  return previous;
}

test(getPrevious, () => {
  given().message('Default value, undefined').expect(undefined);
  given().before(() => previous = 123).expect(123);
  given().before(() => previous = {}).expect({});
});