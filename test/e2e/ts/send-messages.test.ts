import { given, test } from '../../../src/main';

function sendMessage(to: string, content: string) {
  return new Promise((resolve, reject) => {
    const minLength = 3;
    const maxLength = 32;

    if (content.length < minLength) reject('Content too short');
    if (content.length > maxLength) reject('Content too long');
    if (content.includes('transfer money')) reject('No scammers plz');

    setTimeout(() => {
      resolve({ to, content, timestamp: '18-11-2021 02:18' });
    }, 25);
  });
}

test(sendMessage, async () => {
  given('adam@example.com', '').rejectWith('Content too short');
  given('adam@example.com', 'aa').reject();
  given('adam@example.com', 'yay').resolve();
  given('adam@example.com', 'Plz transfer money').rejectWith('No scammers plz');
  given('adam@example.com', 'very gud unit test, pls pass @@@@@').rejectWith('Content too long');
  given('adam@example.com', 'proper msg')
    .message('Payload is correct')
    .assert((msg) => msg.content === 'proper msg');
});
