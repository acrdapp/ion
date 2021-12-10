/**
 * A more complex and practical example, taken from a live project.
 * This is more of an integration test.
 */
import { given, test } from '../../../src/main';
import ChannelDelete, { User } from './channel-delete';

let event = new ChannelDelete();

test(event.invoke.bind(event), () => {
  let user: User;

  beforeEach(() => {    
    event = new ChannelDelete();
    user = { id: 'user-id', perms: [] };
  });
  
  // given(user, { channelId: '' }).rejectWith('Channel not found');
  // given(user, { channelId: '' })
  //   .before(() => addChannel).rejectWith('Channel not found');
})