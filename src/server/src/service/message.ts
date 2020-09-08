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

  /**
   * 获取用户未读消息列表
   *
   * @param {number} uid 用户ID
   * @returns 未读消息列表
   */
  async getUnreadMessage(uid: number) {
    try {
      const data = await db.table(this.table)
        .where({
          dist_id: uid,
          dist_type: 1,
        })
        .where({ 'is_received|is_sent': 0 })
        .select();
      return [null, data];
    } catch (err) {
      return [err, null];
    }
  }

  /**
   * 更新消息信息
   *
   * @param {number} uid 用户ID
   * @param {Record<string, any>} columns 数据列
   */
  async updateMessage(uid: number, columns: Record<string, any>) {
    try {
      const data = await db.table(this.table)
        .where({
          id: uid,
        })
        .update(columns);
      return [null, data];
    } catch (err) {
      return [err, null];
    }
  }

  /**
   * 一次性更新多条消息信息，必须要有主键
   *
   * @param {Record<string, any>[]} columns 数据列
   */
  async updateMultipleMessage(columns: Record<string, any>[]) {
    try {
      const data = await db.table(this.table)
        .updateMany(columns);
      return [null, data];
    } catch (err) {
      return [err, null];
    }
  }
}

export default new Message();
