/* eslint-disable camelcase */
import db from '../lib/db';

export interface MessageData {
  id: number;
  user_id: number;
  dist_id: number; // 接收人或者群
  dist_type: 1 | 2; // 1 - 私聊， 2 - 群聊
  is_received: number;
  is_sent: number;
  type: 'text' | 'audio' | 'video' | 'image';
  content: string;
  create_time: number;
  status: number;
}

class Message {
  private table = 'message';

  getUnreadMessage(uid: number) {
    return db.table(this.table)
      .where({
        dist_id: uid,
        dist_type: 1,
      })
      .where({ 'is_received|is_sent': 0 })
      .select()
      .then((data: MessageData) => [null, data])
      .catch((err: any) => [err, null]);
  }

  updateMessage(id: number, columns: { [index: string]: any }) {
    return db.table(this.table)
      .where({
        id,
      })
      .update(columns)
      .then((data: any) => [null, data])
      .catch((err: any) => [err, null]);
  }

  updateMultipleMessage(columns: { [index: string]: any }[]) {
    return db.table(this.table)
      .updateMany(columns)
      .then((data: any) => [null, data])
      .catch((err: any) => [err, null]);
  }
}

export default new Message();
