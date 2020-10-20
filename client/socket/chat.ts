// @ts-ignore
import io from '@hyoga/uni-socket.io';
import md5 from 'md5';
import config from '../config';
import { ENUM_MESSAGE_CONTENT_TYPE, ENUM_MESSAGE_DIST_TYPE, ENUM_MESSAGE_RESPONSE_STATUS, ENUM_SOCKET_MESSAGE_TYPE } from '../enum/message';
import { RESPONSE_MESSAGE, SOCKET_RESPONSE } from '../interface/response';
import { User, FriendInfo, Message, MessageRecord } from '../interface/entity';
import store from "../store";

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
      socket.on(id, (data: SOCKET_RESPONSE) => {
        console.log('ws 收到服务器消息：', data);
        switch(data.message_type) {
          case ENUM_SOCKET_MESSAGE_TYPE.MESSAGE_STATUS_CONFIRM:
            this.confirmMessage(data.message as RESPONSE_MESSAGE);
        }
      });
    });
    socket.on('error', (msg: any) => {
      console.log('ws error', msg);
    });
  }

  public confirmMessage(message: RESPONSE_MESSAGE) {
    const { status, data } = message;
    switch(status) {
      case ENUM_MESSAGE_RESPONSE_STATUS.SUCCESS:
        store.dispatch('message/updateMessage', { messages: data });
        break;
    }
  }

  public sendMessage(content: string, options: { userInfo: User, friendInfo: FriendInfo, isGroup: boolean }) {
    if (!this.socket) return;
    const { userInfo, friendInfo, isGroup } = options;

    const message: Message = {
      hash: md5(`${userInfo.id}_${friendInfo.friend_id}_${+new Date()}`),
      user_id: userInfo.id,
      dist_id: friendInfo.friend_id,
      dist_type: isGroup ? ENUM_MESSAGE_DIST_TYPE.GROUP : ENUM_MESSAGE_DIST_TYPE.PRIVATE,
      content_type: ENUM_MESSAGE_CONTENT_TYPE.TEXT,
      content,
      create_time: +new Date(),
    };
    const record: MessageRecord = {
      ...message,
      is_owner: true,
    };
    this.socket.emit('message', { message });
    store.dispatch('message/setMessage', { messages: [record] })
  }
}


export default Chat.getInstance();
