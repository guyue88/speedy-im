// @ts-ignore
import io from '@hyoga/uni-socket.io';
import config from '../config';

declare let uni: any;

const { ws } = config;

interface Options {
  token: string;
}

class Chat {
  private static instance: Chat;
  private token: string;
  private socket: any;

  public static getInstance() {
    if (!this.instance) {
      this.instance = new Chat();
    }
    return this.instance;
  }

  setup() {
    this.token = uni.getStorageSync('token');

    if (!this.token) return;

    const socket = io(`${ws.host}/${ws.namespace}`, {
      query: {
        token: this.token,
      },
      transports: [ 'websocket', 'polling' ],
      timeout: 5000,
    });
    this.socket = socket;
    socket.on('connect', () => {
      // ws连接已建立，此时可以进行socket.io的事件监听或者数据发送操作
      console.log('ws 已连接');
      // socket.io 唯一连接id，可以监控这个id实现点对点通讯
      const { id } = socket;
      socket.on(id, (message) => {
        // 收到服务器推送的消息，可以跟进自身业务进行操作
        console.log('ws 收到服务器消息：', message);
      });
    });
  }
}


export default Chat.getInstance();
