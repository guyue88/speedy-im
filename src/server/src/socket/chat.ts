import socketIO from 'socket.io';
import debug from 'debug';
import jwt from 'jsonwebtoken';
import User from '../service/user';
import Group from '../service/group';
import Relation from '../service/relation';
import Message from '../service/message';
import config from '../config';
import { Message as MessageData, User as UserData } from '../interface/entity';
import { CHAT_RESPONSE } from '../interface/response';
import { MESSAGE_DIST_TYPE, MESSAGE_CONTENT_TYPE, MESSAGE_RESPONSE_CODE } from '../enum/message';

const log = debug('ws');

export default class Chat {
  private namespace = 'chat';

  private io: socketIO.Server;

  private nsp: socketIO.Namespace;

  constructor(io: socketIO.Server) {
    this.io = io;
    this.nsp = io.of(this.namespace);
  }

  setup() {
    this.nsp.on('connect', async (socket: socketIO.Socket) => {
      log('用户已连接');

      const { handshake } = socket;
      const { query } = handshake;
      const { token } = query;
      const user: any = jwt.verify(token, config.jwt.secret);
      const { uid } = user;
      this.onMessage(socket, uid);
    });
  }

  private onMessage(socket: socketIO.Socket, uid: number) {
    const { id } = socket;
    socket.on('message', async (payload: { message: MessageData }) => {
      const { message } = payload;
      const {
        dist_id, dist_type = 1, type = MESSAGE_CONTENT_TYPE.TEXT, content,
      } = message;
      const create_time = +new Date();
      let dist_info = {} as UserData;
      const response: CHAT_RESPONSE = {
        errno: MESSAGE_RESPONSE_CODE.SUCCESS,
        errmsg: '',
        data: null,
      };

      if (!dist_id || !content) {
        response.errno = MESSAGE_RESPONSE_CODE.INVALID_PARAMS;
        response.errmsg = 'invalid params';
        socket.emit(id, response);
        return;
      }
      if (dist_type === MESSAGE_DIST_TYPE.PRIVATE) {
        // 判断对方是否存在
        const [, user_info] = await User.getUserInfoById(dist_id);
        if (!user_info) {
          response.errno = MESSAGE_RESPONSE_CODE.USER_NOT_EXIST;
          response.errmsg = 'user not exist';
          socket.emit(id, response);
          return;
        }
        dist_info = user_info;
        // 判断对方是否是自己的好友，可能未添加对方
        const [, info1] = await Relation.getUserFriend(uid, dist_id);
        if (!info1) {
          response.errno = MESSAGE_RESPONSE_CODE.NOT_FRIEND_OF_OTHER;
          response.errmsg = 'not friend of the other side';
          socket.emit(id, response);
          return;
        }
        // 判断自己是对方好友，可能自己已被对方拉黑
        const [, info2] = await Relation.getUserFriend(dist_id, uid);
        if (!info2) {
          response.errno = MESSAGE_RESPONSE_CODE.NOT_FRIEND_OF_MINE;
          response.errmsg = 'not friend of mine';
          socket.emit(id, response);
          return;
        }
      } else {
        // 判断群是否存在并且自己在群里面
        const [, dist_group] = await Group.getUserGroup(uid, dist_id);
        if (!dist_group) {
          response.errno = MESSAGE_RESPONSE_CODE.NOT_IN_GROUP;
          response.errmsg = 'not in group';
          socket.emit(id, response);
          return;
        }
        dist_info = dist_group;
      }
      const final_message: MessageData = {
        user_id: uid,
        dist_id,
        dist_type,
        type,
        content,
        create_time,
        status: 1,
        is_sent: dist_info.token ? 1 : 0,
      };
      const result: any = await Message.createMessage(final_message);
      final_message.id = result.insert_id;

      // 私聊且对方在线
      if (dist_id === MESSAGE_DIST_TYPE.PRIVATE) {
        if (!dist_info.client_id) return;
        response.errmsg = 'success';
        response.data = {
          type: MESSAGE_DIST_TYPE.PRIVATE,
          sender_id: uid,
          receive_id: dist_id,
          message: final_message,
        };
        socket.emit(dist_info.client_id, response);
      } else {
        // 群聊处理
      }
    });
  }
}
