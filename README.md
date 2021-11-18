# accord.ion

Ion is an simple async data driven testing tool built on mocha and chai.

**Purpose**: Test Node.js promises with less code!

### Install

`npm i accord-dot-app/ion`

Take a basic async function that sends a message. It may have to perform database queries, and more. It takes time.

```js
function sendMessage(to: string, content: string) {
  return new Promise((resolve, reject) => {
    const minLength = 3;
    const maxLength = 32;

    if (content.length < minLength) reject('Content too short');
    if (content.length > maxLength) reject('Content too long');
    if (content.includes('transfer money')) reject('No scammers plz');

    setTimeout(() => {
      resolve({ to, content, createdAt: new Date() });
    }, 25);
  });
}
```

Write tests like this...

```js
import { test, given } from '@accord/ion';

test(sendMessage, async () => {
  given('adam@example.com', '').rejectWith('Content too short');
  given('adam@example.com', 'aa').reject();
  given('adam@example.com', 'yay').resolve();
  given('adam@example.com', 'Plz transfer money').rejectWith('No scammers plz');
  given('adam@example.com', 'very gud unit test, pls pass @@@@@').rejectWith(
    'Content too long'
  );
  given('adam@example.com', 'proper msg')
    .message('Payload is correct')
    .assert((msg) =>
      expect(msg).to.deep.equal({
        to: 'adam@example.com',
        content: 'proper msg',
        timestamp: '18-11-2021 02:18',
      })
    );
});
```

Or just like this...

```js
test(sendMessage, async () => {
  given('adam@example.com', '').reject();
  given('adam@example.com', 'aa').reject();
  given('adam@example.com', 'yay').resolve();
  given('adam@example.com', 'Plz transfer money').reject();
  given('adam@example.com', 'very gud unit test, pls pass @@@@@').reject();
  given('adam@example.com', 'proper msg').resolve();
});
```

Not this...

```js
describe('sendMessage', async () => {
  it(`valid email, empty string content, rejected'`, () => {
    const result = () => await sendMessage('adam@example.com', '');
    await expect(result()).to.be.rejectedWith('Content too short');
  });

  it(`valid email, too short content, rejected'`, () => {
    const result = () => await sendMessage('adam@example.com', 'aa');
    await expect(result()).to.be.rejectedWith('Content too short');
  });

  it(`valid email, valid content length, resolved`, () => {
    const result = () => await sendMessage('adam@example.com', 'yay');
    expect(await result()).not.to.be.rejected;
  });

  // Yeah, I'm not writing this all out, it's 2:30AM.
  // Just imagine another 3 of these...
});
```

Inspired by [sazerac](https://github.com/sazeracjs/sazerac).
