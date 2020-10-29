import { MessageRecord } from "../interface/entity";

declare var uni: any;

type LocalMessages = Record<number,  MessageRecord[]>;

class Message {
  private key = 'local_message_history';

  // 从本地存储中恢复数据
  public recover() {

  }

  // 保存消息
  public async save(messages: MessageRecord[]) {
    const [,data = {}] = await this.getAll();

    messages.forEach(message => {
      const { dist_id, user_id, is_owner } = message;
      // 自己发的消息，friend_id是dist_id，否则则是user_id
      const friend_id = is_owner ? dist_id : user_id;
      let localItem = data[friend_id];
      if (!localItem) {
        localItem = [message];
      } else {
        !localItem.find(l => l.hash === message.hash) && localItem.push(message);
      }
      data[friend_id] = localItem;
    });
    this.saveAll(data);
  }

  private async saveAll(data: LocalMessages) {
    return uni.getStorage({ key: this.key, data })
  }

  private async getAll() {
    return uni.getStorage({ key: this.key });
  }

  private async getItem(id: number) {
    const [,data] = await this.getAll();
    if (!data || !data[id]) return [];
    return data[id];
  }
  
}

class Contacts {

}

export default {
  message: new Message(),
  contacts: new Contacts(),
};
