import socketIO from 'socket.io';
import debug from 'debug';
import jwt from 'jsonwebtoken';
import User from '../service/user';
import Group from '../service/group';
import Relation from '../service/relation';
import Message from '../service/message';
import config from '../config';
import { Message as MessageData, User as UserData } from '../interface/entity';

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
        dist_id, dist_type = 1, type = 'text', content,
      } = message;
      const create_time = +new Date();
      let dist_info = {} as UserData;

      if (!dist_id) return;
      if (dist_type === 1) {
        // 判断对方是否存在
        const [, user_info] = await User.getUserInfoById(dist_id);
        if (!user_info) return;
        dist_info = user_info;
        // 判断对方是否是自己的好友，可能未添加对方
        const [, info1] = await Relation.getUserFriend(uid, dist_id);
        if (!info1) return;
        // 判断自己是对方好友，可能自己已被对方拉黑
        const [, info2] = await Relation.getUserFriend(dist_id, uid);
        if (!info2) return;
      } else {
        // 判断群是否存在并且自己在群里面
        const [, dist_group] = await Group.getUserGroup(uid, dist_id);
        if (!dist_group) return;
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
      socket.emit(id, {
        message_id: result.id,
      });
      log(message);
    });
  }
}
