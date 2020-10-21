// @ts-ignore
import io from '@hyoga/uni-socket.io';
import md5 from 'md5';
import config from '../config';
import { ENUM_MESSAGE_CONTENT_TYPE, ENUM_MESSAGE_DIST_TYPE, ENUM_MESSAGE_RESPONSE_STATUS, ENUM_SOCKET_MESSAGE_TYPE } from '../enum/message';
import { CHAT_MESSAGE, RESPONSE_MESSAGE, SOCKET_RESPONSE } from '../interface/response';
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
          case ENUM_SOCKET_MESSAGE_TYPE.PRIVATE_CHAT:
            this.onMessage(data.message as CHAT_MESSAGE);
            break;
          case ENUM_SOCKET_MESSAGE_TYPE.MESSAGE_STATUS_CONFIRM:
            this.onConfirmMessage(data.message as RESPONSE_MESSAGE);
            break;
        }
      });
    });
    socket.on('error', (msg: any) => {
      console.log('ws error', msg);
    });
  }

  /**
   * 接收到好友发来消息
   * @param data { CHAT_MESSAGE } 接收到的好友消息
   */
  public onMessage(data: CHAT_MESSAGE) {
    const { messages } = data;
    store.dispatch('message/setMessage', { messages });
  }

  /**
   * 消息确认，确认消息已被接收，并更新消息ID
   * @param message { RESPONSE_MESSAGE } 收到的消息
   */
  public onConfirmMessage(message: RESPONSE_MESSAGE) {
    const { status, data } = message;
    switch(status) {
      // 消息发送成功，更新消息ID
      case ENUM_MESSAGE_RESPONSE_STATUS.SUCCESS:
        store.dispatch('message/updateMessage', { messages: data });
        break;
      // TODO: 消息发送失败等处理
    }
  }

  public sendMessage(content: string, options: { user_info: User, friend_info: FriendInfo, is_group: boolean }) {
    if (!this.socket) return;
    const { user_info, friend_info, is_group } = options;

    const message: Message = {
      hash: md5(`${user_info.id}_${friend_info.friend_id}_${+new Date()}`),
      user_id: user_info.id,
      dist_id: friend_info.friend_id,
      dist_type: is_group ? ENUM_MESSAGE_DIST_TYPE.GROUP : ENUM_MESSAGE_DIST_TYPE.PRIVATE,
      content_type: ENUM_MESSAGE_CONTENT_TYPE.TEXT,
      content,
      create_time: +new Date(),
    };
    const record: MessageRecord = {
      ...message,
      is_owner: 1,
    };
    this.socket.emit('message', { message });
    store.dispatch('message/setMessage', { messages: [record] });
    store.dispatch('user/setRecentContact', { friend_id: friend_info.friend_id });
  }
}


export default Chat.getInstance();
