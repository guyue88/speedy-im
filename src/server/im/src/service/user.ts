export default class User {
  private table: string;

  constructor(table = 'mc_user') {
    this.table = table;
  }
}
