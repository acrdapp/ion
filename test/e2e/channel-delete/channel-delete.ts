import { promisify } from 'util';

const sleep = promisify(setTimeout);

export interface Channel {
  id: string;
  guildId: string;
  position: number;
  deleteOne(): Promise<boolean>;
}
export interface User {
  id: string;
  perms: string[]; 
}

let channels: Channel[] = [];

export default class {
  public async invoke(user: User, { channelId }) {
    const channel = await this.getChannel(channelId);
    if (!channel)
      throw new TypeError('Channel not found');

    if (!user.perms.includes('MANAGE_CHANNELS'))
      throw new TypeError('Insufficient permissions');

    await channel.deleteOne();
    await this.lowerHigherChannels(channel);

    return [{
      emit: 'CHANNEL_DELETE',
      to: [channel.guildId],
      send: { channelId, guildId: channel.guildId },
    }];
  }

  private async getChannel(id: string) {
    await sleep(15);
    return channels.find(c => c.id === id);
  }

  private async lowerHigherChannels(deletedChannel: Channel) {
    await sleep(10);
    channels = channels
      .filter(c => c.position > deletedChannel.position)
      .map(c => ({ ...c, position: c.position - 1 }));
  }
}