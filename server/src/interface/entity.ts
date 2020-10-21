import { ENUM_MESSAGE_CONTENT_TYPE, ENUM_MESSAGE_DIST_TYPE } from '../enum/message';

export interface Message {
  id?: number;
  hash: string;
  user_id: number;
  dist_id: number;
  dist_type: ENUM_MESSAGE_DIST_TYPE;
  content_type: ENUM_MESSAGE_CONTENT_TYPE;
  is_received?: number;
  is_sent?: number;
  content: string;
  create_time: number;
  status: number;
}

export interface User {
  id: number;
  nickname: string;
  mobile: number;
  password: string;
  avatar: string;
  sex: number;
  token: string;
  client_id: string;
  client_type: 'android' | 'ios';
  create_time: number;
  status: number;
}

export interface FriendInfo extends User {
  uid: number;
  friend_id: number;
  remark: string;
}

// 扩展的接口
export interface MessageRecord extends Message {
  is_owner: 0 | 1;
}
