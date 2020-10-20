import { ActionContext } from 'vuex';
import request from '../../helper/request';
import { MessageRecord } from '../../interface/entity';

interface State {
  messages: {
    friend_id: number;
    list: MessageRecord[];
  }[];
}

const state: State = {
  messages: [],
};

const mutations = {
  SET_USER_MESSAGES(state: State, { messages: list }: { messages: MessageRecord[] }) {
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
        !msg.list.find(l => l.id === item.id) && msg.list.push(item);
      }
    });
    state.messages = messages;
  },
  UPDATE_MESSAGE(state: State, { messages: data }: { messages: { id: number, hash: string, friend_id: number } }) {
    const messages = [...state.messages];
    const { id, hash, friend_id } = data;
    for (let i = 0, len = messages.length; i < len;i++) {
      const item = messages[i];
      if (+item.friend_id === +friend_id) {
        item.list = item.list.map(m => {
          if (m.hash === hash) {
            m.id = id;
          }
          return m;
        });
        break;
      }
    }
    state.messages = messages;
  },
};

const actions = {
  async getUnreadMessage({ commit }: ActionContext<State, any>) {
    const [err, res] = await request({
      url: '/user/unreadMessage',
      method: 'get',
    });
    if (res && res.errno === 200) {
      commit('SET_USER_MESSAGES', { messages: res.data });
    }
  },
  async setMessage({ commit }: ActionContext<State, any>, payload: { messages: MessageRecord[] }) {
    const { messages } = payload;
    commit('SET_USER_MESSAGES', { messages });
  },
  updateMessage({ commit }: ActionContext<State, any>, payload: { messages: { id: number, hash: string, friend_id: number } }) {
    const { messages } = payload;
    commit('UPDATE_MESSAGE', { messages });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
