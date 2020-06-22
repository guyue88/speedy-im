// 聊天消息类型，系统消息或者好友消息
export enum MessageType {
  SYSTEM = 1, // 系统消息
  CHAT, // 聊天消息
}

// 消息发送状态
export enum SendStatus {
  NONE = 1,
  SENDING,
  SUCCESS,
  FAIL,
}

// 用户类型，包括客服、系统、好友、自己等
export enum UserType {
  KEFU = 1,
  SYSTEM,
  FRIEND,
  SELF,
}

// 类型信息
export interface ChatUser {
  id: number;
  type: UserType; // 客服，好友，自己
}

export interface FriendInfo {
  uid: number;
  friend_id: number;
  remark: string;
  status: number;
  friend_name: string;
  friend_mobile: number;
  friend_avatar: string;
  friend_sex: number;
}

export interface UserInfo {
  id: number;
  name: string;
  mobile: number;
  avatar: string;
  status: number;
  token: string;
}

// 消息体
export interface MessageRecord {
  id: number;
  user_id: number;
  dist_id: number; // 接收人或者群
  dist_type: 1 | 2; // 1 - 私聊， 2 - 群聊
  is_received: 0 | 1;
  is_sent: 0 | 1;
  type: 'text' | 'audio' | 'video' | 'image';
  content: string;
  create_time: number;
  is_owner: boolean;
}