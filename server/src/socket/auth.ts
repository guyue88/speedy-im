import socketIO from 'socket.io';
import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../service/user';

export default (socket: socketIO.Socket, next: any) => {
  // const socketId = socket.id;
  const { token } = socket.handshake.query;
  if (!token) {
    return next(new Error('用户未登录'));
  }
  const user: any = jwt.verify(token, config.jwt.secret);
  const { uid } = user;
  if (!uid) {
    return next(new Error('用户不存在'));
  }
  const info = User.getUserInfoById(uid);
  if (!info) {
    return next(new Error('用户不存在'));
  }
  next();
};
