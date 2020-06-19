import { ActionContext } from 'vuex';
import request from '../../helper/request';
import Chat from '../../socket/chat';

declare let uni: any;

interface MessageData {
  id: number;
  user_id: number;
  dist_id: number; // 接收人或者群
  dist_type: 1 | 2; // 1 - 私聊， 2 - 群聊
  is_received: number;
  is_sent: number;
  type: 'text' | 'audio' | 'video' | 'image';
  content: string;
  create_time: number;
  status: number;
  is_owner: boolean;
};

interface UserMessages {
  [index: number]: MessageData[];
}

interface State {
  messages: {
    friend_id: number;
    list: MessageData[];
  }[];
}

const state: State = {
  messages: [],
};

const mutations = {
  SET_USER_MESSAGES(state: State, { messages: list }: { messages: MessageData[] }) {
    const messages = [...state.messages];
    list.forEach(item => {
      const { dist_id, user_id, is_owner } = item;
      const friend_id = is_owner ? dist_id : user_id;
      const msg = messages.find(c => c.friend_id === friend_id);
      if (!msg) {
        messages.push({
          friend_id,
          list: [item],
        });
      } else {
        msg.list.push(item);
      }
    });
    state.messages = messages;
  },
};

const actions = {
  async getUnreadMessage({ commit }: ActionContext<State, any>) {
    const [err, res] = await request({
      url: '/user/unread-message',
      method: 'get',
    });
    if (res && res.errno === 200) {
      commit('SET_USER_MESSAGES', { messages: res.data });
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
