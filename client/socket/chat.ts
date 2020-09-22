// @ts-ignore
import io from '@hyoga/uni-socket.io';
import config from '../config';

declare let uni: any;

const { ws } = config;

interface Options {
  token: string;
}

export default class Chat {
  private static instance: Chat;
  private token: string;
  private socket: any;

  public static getInstance() {
    if (!this.instance) {
      this.instance = new Chat();
    }
    return this.instance;
  }

  setup (options: Options) {
    this.token = options.token;
    if (this.token) {
      const socket = io(`${ws.host}/${ws.namespace}`, {
        query: {
          token: this.token,
        },
        transports: [ 'websocket', 'polling' ],
        timeout: 5000,
      });
      this.socket = socket;
    }
  }
}
