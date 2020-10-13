export enum ENUM_MESSAGE_DIST_TYPE {
  PRIVATE = 1,
  GROUP = 2,
}

export enum ENUM_MESSAGE_CONTENT_TYPE {
  TEXT = 'text',
  AUDIO = 'audio',
  IMAGE = 'image',
  VIDEO = 'video',
}

// socket通信内容类型
export enum ENUM_SOCKET_MESSAGE_TYPE {
  PRIVATE_CHAT = 1000,
  GROUP_CHAT,
  MESSAGE_STATUS_CONFIRM, // 消息发送状态确认
}

// 消息发送成功与否的状态
export enum ENUM_MESSAGE_RESPONSE_STATUS {
  SUCCESS = 1000,
  ERROR,
  INVALID_PARAMS,
  USER_NOT_EXIST,
  NOT_FRIEND_OF_OTHER, // 自己不是对方好友
  NOT_FRIEND_OF_MINE, // 对方不是自己好友
  NOT_IN_GROUP,
}
