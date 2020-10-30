import { MessageRecord } from "../interface/entity";
import store from "../store";

declare var uni: any;

type LocalMessages = Record<number,  MessageRecord[]>;

class Message {
  private key = 'local_message_history';

  // 从本地存储中恢复数据
  public async recover() {
    const messages = await this.getAll();
    Object.keys(messages).length && store.dispatch('message/recoverMessages', { messages });
  }

  // 保存消息
  public async save(messages: MessageRecord[]) {
    const data = await this.getAll();

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
      // 只存储100条对话
      data[friend_id] = localItem.slice(-100);
    });
    this.saveAll(data);
  }

  // 更新消息id
  public async update({ messages }: { messages: { id: number, hash: string, friend_id: number } }) {
    const list = await this.getAll();
    const { id, hash, friend_id } = messages;
    const msg = list[friend_id];
    if (!msg) {
      return;
    }
    list[friend_id] = msg.map(m => {
      if (m.hash === hash) {
        m.id = id;
      }
      return m;
    });
    this.saveAll(list);
  }

  private async saveAll(data: LocalMessages) {
    return uni.setStorage({ key: this.key, data });
  }

  private async getAll() {
    const [,data = {}] = await uni.getStorage({ key: this.key });
    return data.data || {};
  }

}

class Contacts {
  private key = 'local_recent_contacts';
   // 从本地存储中恢复数据
   public async recover() {
    const list = await this.getAll();
    list.length && store.dispatch('user/setFullRecentContacts', { list });
  }

  // 保存消息
  public async save(id: number) {
    const data = await this.getAll();

    this.saveAll(Array.from(new Set([id, ...data])));
  }

  private async saveAll(data: LocalMessages) {
    return uni.setStorage({ key: this.key, data });
  }

  private async getAll() {
    const [,data = {}] = await uni.getStorage({ key: this.key });
    return data.data || [];
  }
}

export default {
  message: new Message(),
  contacts: new Contacts(),
};
