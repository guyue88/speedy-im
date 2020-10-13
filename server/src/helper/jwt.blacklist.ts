interface Item {
  exp: number, token: string
}

/**
 * 用于吊销jwt凭证
 * TODO: 使用redis等持久存储黑名单
 */
export default class BlackList {
  private static list: Item[] = [];

  // 过滤掉已经过期的token
  private static filterOverdueToken() {
    const time = +new Date();
    this.list = this.list.filter((item: Item) => item.exp > time);
  }

  public static add(token: string, exp: number) {
    this.filterOverdueToken();

    if (!this.isTokenInList(token)) {
      this.list.push({
        exp: exp * 1000,
        token,
      });
    }
  }

  public static isTokenInList(token: string) {
    return this.list.find((item: Item) => item.token === token);
  }
}
