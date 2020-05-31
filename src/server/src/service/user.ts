import db from '../lib/db';

class User {
  private table: string = 'user';

  getUserInfoByPassword(mobile: number, password: string) {
    return db.table(this.table)
      .where({
        mobile,
        password,
      })
      .find()
      .then((data: any) => [null, data])
      .catch(err => [err, null]);
  }
}

export default new User;
