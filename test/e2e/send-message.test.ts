import { given, test } from '../../src/main';

let messages: any[] = [];

function sendMessage(to: string, content: string) {
  return new Promise((resolve, reject) => {
    const minLength = 3;
    const maxLength = 32;

    if (content.length < minLength) reject('Content too short');
    if (content.length > maxLength) reject('Content too long');
    if (content.includes('transfer money')) reject('No scammers plz');

    const timeToComplete = 25 + (Math.random() * 10);
    setTimeout(() => {
      const message = { id: messages.length + 1, to, content, timestamp: '18-11-2021 02:18' };
      messages.push(message);
      resolve(message);
    }, timeToComplete);
  });
}

test(sendMessage, async () => {
  beforeEach(() => messages = []);

  given('adam@example.com', 'proper msg')
    .message('Payload is correct, resolved')
    .before(() => messages = [])
    .resolveWith({
      id: 1,
      to: 'adam@example.com',
      content: 'proper msg',
      timestamp: '18-11-2021 02:18',
    });
  given('adam@example.com', 'proper msg')
    .before(async () => messages = [
      await sendMessage('me', 'sample text')
    ])
    .message('2 messages, id is incremented')
    .resolveWith({
      id: 2,
      to: 'adam@example.com',
      content: 'proper msg',
      timestamp: '18-11-2021 02:18',
    });
  given('adam@example.com', '').rejectWith('Content too short');
  given('adam@example.com', 'aa').reject();
  given('adam@example.com', 'yay').resolve();
  given('adam@example.com', 'Plz transfer money').rejectWith('No scammers plz');
  given('adam@example.com', 'very gud unit test, pls pass @@@@@').rejectWith('Content too long');
});
