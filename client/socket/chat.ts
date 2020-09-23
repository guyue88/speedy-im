// @ts-ignore
import io from '@hyoga/uni-socket.io';
import config from '../config';
import { ENUM_MESSAGE_CONTENT_TYPE, ENUM_MESSAGE_DIST_TYPE } from '../enum/message';
import { User, FriendInfo, Message } from '../interface/entity';

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

  public setup() {
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
      console.log('ws 已连接');
      const { id } = socket;
      socket.on(id, (message) => {
        console.log('ws 收到服务器消息：', message);
      });
    });
    socket.on('error', (msg: any) => {
      console.log('ws error', msg);
    });
  }

  public sendMessage(content: string, options: { userInfo: User, friendInfo: FriendInfo, isGroup: boolean }) {
    if (!this.socket) return;
    const { userInfo, friendInfo, isGroup } = options;

    const message: Message = {
      user_id: userInfo.id,
      dist_id: friendInfo.id,
      dist_type: isGroup ? ENUM_MESSAGE_DIST_TYPE.GROUP : ENUM_MESSAGE_DIST_TYPE.PRIVATE,
      content_type: ENUM_MESSAGE_CONTENT_TYPE.TEXT,
      content,
      create_time: +new Date(),
    }
    this.socket.emit('message', { message });
  }
}


export default Chat.getInstance();
