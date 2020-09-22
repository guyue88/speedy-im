import db from '../lib/db';
import { Message as MessageData } from '../interface/entity';

class Message {
  private table = 'message';

  /**
   * 创建一条信息
   *
   * @param {MessageData} message 消息
   * @returns
   */
  async createMessage(message: MessageData) {
    try {
      const data = await db.table(this.table)
        .add(message);
      return [null, data];
    } catch (err) {
      return [err, null];
    }
  }

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
   * @param {number} id 消息ID
   * @param {Record<string, any>} columns 数据列
   */
  async updateMessage(id: number, columns: Record<string, any>) {
    try {
      const data = await db.table(this.table)
        .where({
          id,
        })
        .update(columns);
      return [null, data];
    } catch (err) {
      return [err, null];
    }
  }

  /**
   * 一次性更新多条消息信息的某个字段
   *
   * @param {number[]} ids 主键列表
   * @param {Record<string, any>[]} columns 数据列
   */
  async updateMultipleMessage(ids: number[], columns: Record<string, any>) {
    try {
      const data = await db.table(this.table)
        .where({
          id: ['in', ids || []],
        })
        .update(columns);
      return [null, data];
    } catch (err) {
      return [err, null];
    }
  }
}

export default new Message();
