import { ActionContext } from 'vuex';
import request from '../../helper/request';
import { MessageRecord } from '../../interface/entity';

export interface State {
  list: Record<number, MessageRecord[]>;
  lastHashIdMap: Record<number, string>; // 用于设置滚动到底部的hash id
}

const state: State = {
  list: {},
  lastHashIdMap: {},
};

const mutations = {
  SET_USER_MESSAGES(state: State, { messages }: { messages: MessageRecord[] }) {
    const list = {...state.list};
    const lastHashIdMap = {...state.lastHashIdMap};
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
      lastHashIdMap[friend_id] = item.hash;
    });
    state.list = list;
    state.lastHashIdMap = lastHashIdMap;
  },
  RECOVER_MESSAGE(state: State, { messages }: { messages: Record<number, MessageRecord[]>}) {
    // 接收消息或者发消息，先本地存储，所以本地消息永远先与当前消息，直接取用即可
    const list = {...state.list};
    const lastHashIdMap = {...state.lastHashIdMap};
    for (let friend_id in messages) {
      const localItem = messages[friend_id] || [];
      const item = list[friend_id] || [];
      const { length: localLength } = localItem;
      const { length } = item;
      lastHashIdMap[friend_id] = localItem[localLength - 1].hash;
      if (localLength > length) {
        list[friend_id] = localItem;
      }
    }
    state.list = list;
    state.lastHashIdMap = lastHashIdMap;
  },
  UPDATE_MESSAGE_ID(state: State, { messages }: { messages: { id: number, hash: string, friend_id: number } }) {
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
  setMessage({ commit }: ActionContext<State, any>, payload: { messages: MessageRecord[] }) {
    const { messages } = payload;
    commit('SET_USER_MESSAGES', { messages });
  },
  recoverMessages({ commit }: ActionContext<State, any>, payload: { messages: Record<number, MessageRecord[]> }) {
    const { messages } = payload;
    commit('RECOVER_MESSAGE', { messages });
  },
  updateMessage({ commit }: ActionContext<State, any>, payload: { messages: { id: number, hash: string, friend_id: number } }) {
    const { messages } = payload;
    commit('UPDATE_MESSAGE_ID', { messages });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
