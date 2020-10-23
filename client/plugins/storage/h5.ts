declare var uni: any;

interface DataBaseOption {
  name: string;
  path: string;
}
export default class StorageH5 {
  public static openDatabase(options: DataBaseOption): Promise<Storage | null> {
    return new Promise((resolve, reject) => {
      uni.getStorage({
        key: options.name,
        success() {
          resolve(Storage);
        },
        fail() {
          resolve(null);
        }
      });
    });
  }

  public static async isOpenDatabase(options: DataBaseOption): Promise<boolean> {
    const instance = await this.openDatabase(options);
    return !!instance;
  }
}

class Storage {

}