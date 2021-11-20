import { use } from 'chai';
import chaiAsPromised from 'chai-as-promised';

use(chaiAsPromised);

export { default as given } from './functions/given';
export { default as test } from './functions/test';