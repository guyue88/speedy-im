import socketIO from 'socket.io';
import debug from 'debug';
import { Message } from '../interface/chat';

const log = debug('ws');

export default class Chat {
  private namespace: string = 'chat';
  private io: socketIO.Server;
  private nsp: socketIO.Namespace;

  constructor(io: socketIO.Server) {
    this.io = io;
    this.nsp = io.of(this.namespace);
  }

  setup() {
    this.nsp.on('connect', async(socket: socketIO.Socket) => {
      log('用户已连接');
      this.onMessage(socket);
    });
  }

  private onMessage(socket: socketIO.Socket) {
    // const { id, handshake } = socket;
    // const { query } = handshake;
    socket.on('message', async (payload: { message: Message }) => {
      const { message } = payload;
      const time = +new Date();
      const final = {
        user_id: 1,
        dist_id: message.dist_id,
        content_type: message.content_type || 'text',
        content: message.content,
        create_time: time,
      }
      log(message);
    });
  }
}