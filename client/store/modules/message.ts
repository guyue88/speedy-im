import { ActionContext } from 'vuex';
import request from '../../helper/request';
import { MessageRecord } from '../../interface/entity';

export interface State {
  list: Record<number, MessageRecord[]>;
}

const state: State = {
  list: {},
};

const mutations = {
  SET_USER_MESSAGES(state: State, { messages }: { messages: MessageRecord[] }) {
    const list = {...state.list};
    messages.forEach(item => {
      const { dist_id, user_id, is_owner } = item;
      // 自己发的消息，friend_id是dist_id，否则则是user_id
      const friend_id = is_owner ? dist_id : user_id;
      const msg = list[friend_id];
      if (!msg) {
        list[friend_id] = [item];
      } else {
        !msg.find(l => l.hash === item.hash) && msg.push(item);
      }
    });
    state.list = list;
  },
  UPDATE_MESSAGE(state: State, { messages }: { messages: { id: number, hash: string, friend_id: number } }) {
    const list = {...state.list};
    const { id, hash, friend_id } = messages;
    const msg = list[friend_id];
    if (!msg) {
      return;
    }
    list[friend_id] = msg.map(m => {
      if (m.hash === hash) {
        m.id = id;
      }
      return m;
    });
    state.list = list;
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
