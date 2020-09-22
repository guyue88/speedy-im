// 聊天消息类型，系统消息或者好友消息
export const MessageType = {
  SYSTEM: 1, // 系统消息
  CHAT: 2, // 聊天消息
}

// 消息发送状态
export const SendStatus = {
  NONE: 1,
  SENDING: 2,
  SUCCESS: 3,
  FAIL: 4,
}

// 用户类型，包括客服、系统、好友、自己等
export const UserType = {
  KEFU: 1,
  SYSTEM: 2,
  FRIEND: 3,
  SELF: 4,
}

// 内容类型
export const ContentType = {
  TEXT: 1,
  IMAGE: 2,
  AUDIO: 3,
}

// 消息时属于自己还是朋友发送的
export const MessageBelong = {
  SYSTEM: 1,
  FRIEND: 2,
  SELF: 3,
}