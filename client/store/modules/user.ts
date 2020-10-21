import { ActionContext } from 'vuex';
import request from '../../helper/request';
import { User, FriendInfo } from '../../interface/entity';
import Chat from '../../socket/chat';

declare let uni: any;

export interface State {
  user_info: User;
  friends_map: Record<number, FriendInfo>;
  friends: {
    key: string; // 用户名首字母
    list: number[]
  }[];
  recent_contacts: number[],
}

const state: State = {
  user_info: {} as User,
  friends_map: {},
  friends: [],
  recent_contacts: [],
};

const mutations = {
  SET_USER_INFO(state: State, payload: { user_info: User }) {
    state.user_info = payload.user_info;
  },
  SET_USER_FRIENDS(state: State, payload: { friends: { key: string; list: FriendInfo[] }[] }) {
    const { friends } = payload;
    const map = {};
    const tmp = friends.map(item => {
      const { key, list } = item;
      return {
        key,
        list: list.map(l => {
          l.nickname = l.remark || l.nickname;
          map[l.friend_id] = l;
          return l.friend_id;
        }),
      }
    });
    state.friends = tmp;
    state.friends_map = map;
  },
  SET_RECENT_CONTACT(state: State, payload: { friend_id: number }) {
    state.recent_contacts = Array.from(new Set([...state.recent_contacts, payload.friend_id]));
  }
};

const actions = {
  async getFriendsList({ commit }: ActionContext<State, any>) {
    const [err, res] = await request({
      url: '/user/friends',
      method: 'get',
    });
    if (res && res.errno === 200) {
      commit('SET_USER_FRIENDS', { friends: res.data });
    }
  },
  async login({ commit, dispatch }: ActionContext<State, any>, { mobile, password }: { mobile: number, password: string }) {
    const [err, res] = await request({
      url: '/user/signIn',
      method: 'PUT',
      data: {
        mobile,
        password,
      }
    });
    if (res && res.errno === 200) {
      await dispatch('getFriendsList');
      commit('SET_USER_INFO', { user_info: res.data });
      uni.setStorageSync('token', res.data.token);
      // 登陆成功后，建立ws连接
      Chat.setup();
      return {
        errno: 200,
        errmsg: '',
        data: res.data,
      };
    }
    return {
      errno: res && res.errno || 1,
      errmsg: res && res.errmsg || '网络错误',
      data: null,
    };
  },
  async autoLogin({ commit, dispatch }: ActionContext<State, any>) {
    const [err, res] = await request({
      url: '/user/info',
    });
    if (res && res.errno === 200) {
      await dispatch('getFriendsList');
      commit('SET_USER_INFO', { user_info: res.data });
      // 登陆成功后，建立ws连接
      Chat.setup();
      return {
        errno: 200,
        errmsg: '',
        data: res.data,
      };
    }
    return {
      errno: res && res.errno || 1,
      errmsg: res && res.errmsg || '网络错误',
      data: null,
    };
  },
  setRecentContact({ commit }: ActionContext<State, any>, { friend_id }: { friend_id: number }) {
    commit('SET_RECENT_CONTACT', { friend_id });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
