import db from '../lib/db';

export interface UserData {
  id: number;
  name: string;
  mobile: number;
  password: string;
  avatar: string;
  status: number;
}

class User {
  private table = 'user';

  createUser(info: { mobile: number; password: string;}) {
    return db.table(this.table)
      .add(info)
      .then((data: UserData) => [null, data])
      .catch((err: any) => [err, null]);
  }

  getUserInfoByMobile(mobile: number) {
    return db.table(this.table)
      .where({
        mobile,
      })
      .find()
      .then((data: UserData) => [null, data])
      .catch((err: any) => [err, null]);
  }

  getUserInfoById(id: number) {
    return db.table(this.table)
      .where({
        id,
      })
      .find()
      .then((data: UserData) => [null, data])
      .catch((err: any) => [err, null]);
  }

  getUserInfoByPassword(mobile: number, password: string) {
    return db.table(this.table)
      .where({
        mobile,
        password,
      })
      .find()
      .then((data: UserData) => [null, data])
      .catch((err: any) => [err, null]);
  }

  getRelationByUid(uid: number) {
    return db.table('view_user_friends')
      .where({
        uid,
      })
      .select()
      .then((data: UserData) => [null, data])
      .catch((err: any) => [err, null]);
  }

  updateUserToken(id: number, payload: { token: string; platform: string }) {
    return db.table(this.table)
      .where({
        id,
      })
      .update({
        token: payload.token,
        client_type: payload.platform,
      })
      .then((data: UserData) => [null, data])
      .catch((err: any) => [err, null]);
  }
}

export default new User();
