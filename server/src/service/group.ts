import db from '../lib/db';

class Group {
  private table = 'user_group';

  /**
   * 获取用户加入的某个群
   *
   * @param {number} uid 用户ID
   * @param {number} groupId 群ID
   * @returns 群信息
   */
  async getUserGroup(uid: number, groupId: number) {
    try {
      const data = await db.table(this.table)
        .where({
          uid,
          group_id: groupId,
          status: 1,
        })
        .select();
      return [null, data];
    } catch (err) {
      return [err, null];
    }
  }
}

export default new Group();
