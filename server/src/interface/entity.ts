export interface Message {
  id?: number;
  user_id: number;
  dist_id: number;
  dist_type: number; // 1 - 私聊，2 - 群聊
  type: string; // 消息类型，text,audio,image,video
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
