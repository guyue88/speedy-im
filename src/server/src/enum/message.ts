export enum MESSAGE_DIST_TYPE {
  PRIVATE = 1,
  GROUP = 2,
}

export enum MESSAGE_CONTENT_TYPE {
  TEXT = 'text',
  AUDIO = 'audio',
  IMAGE = 'image',
  VIDEO = 'video',
}

export enum MESSAGE_RESPONSE_CODE {
  SUCCESS = 1000,
  INVALID_PARAMS,
  USER_NOT_EXIST,
  NOT_FRIEND_OF_OTHER, // 自己不是对方好友
  NOT_FRIEND_OF_MINE, // 对方不是自己好友
  NOT_IN_GROUP,
}

export default {};
