import db from '../lib/db';

class Relation {
  private table = 'relation';

  /**
   * 获取用户加入的某个群
   *
   * @param {number} uid 用户ID
   * @param {number} friendId 好友用户ID
   * @returns 群信息
   */
  async getUserFriend(uid: number, friendId: number) {
    try {
      const data = await db.table(this.table)
        .where({
          uid,
          friend_id: friendId,
          status: 1,
        })
        .select();
      return [null, data];
    } catch (err) {
      return [err, null];
    }
  }
}

export default new Relation();
