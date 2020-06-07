export interface Message {
  id: number;
  user_id: number;
  dist_id: number;
  message_type: number;
  is_received: number;
  is_sent: number;
  content_type: string;
  content: string;
  create_time: number;
  status: number;
}
