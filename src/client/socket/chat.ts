// @ts-ignore
import io from '@hyoga/uni-socket.io';
import config from '../config';

declare let uni: any;

const { ws } = config;

interface Options {
  token: string;
}

class Chat {
  private token: string;
  private socket: any;

  constructor(options: Options) {
    this.token = options.token;
  }

  setup () {
    const socket = this.token && io(`${ws.host}/${ws.namespace}`, {
      query: {
        token: this.token,
      },
      transports: [ 'websocket', 'polling' ],
      timeout: 5000,
    });
    this.socket = socket;
  }
}


let __instance__: any = null;
export default function getInstance(options: Options): Chat {

  if (__instance__) {
    return __instance__;
  }

  __instance__ = new Chat(options);

  return __instance__;
}
