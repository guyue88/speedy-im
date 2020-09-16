import { MESSAGE_RESPONSE_CODE, MESSAGE_DIST_TYPE } from '../enum/message';

export interface CHAT_MESSAGE {
  type: MESSAGE_DIST_TYPE; // 私聊还是群聊
  sender_id: number; // 发送者ID
  receive_id: number; // 接收者ID
  message: any;
}

export interface CHAT_RESPONSE {
  errno: MESSAGE_RESPONSE_CODE;
  errmsg: string;
  data: CHAT_MESSAGE | null;
}
