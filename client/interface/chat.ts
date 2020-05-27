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

// 内容类型
export enum ContentType {
  TEXT = 1,
  IMAGE,
  AUDIO,
}

// 消息时属于自己还是朋友发送的
export enum MessageBelong {
  SYSTEM = 1,
  FRIEND,
  SELF,
}

// 类型信息
export interface ChatUser {
  id: number;
  type: UserType; // 客服，好友，自己
}

export interface MessageRecord {
  id: number;
  content: string;
  content_type: ContentType;
  create_time: number;
  is_read: 0 | 1;
  is_received: 0 | 1;
  message_type: MessageType;
  sender: ChatUser;
  receiver: ChatUser;
  send_status: SendStatus;
  message_belong: MessageBelong;
}