import { ActionContext } from 'vuex';
import request from '../../helper/request';
import socket from '../../socket/chat';

declare let uni: any;

interface State {
  userInfo: {
    id: number;
    name: string;
    mobile: number;
    avatar: string;
    status: number;
    token: string;
  };
  friends: {
    key: string;
    list: {
      uid: string;
      friend_id: string;
      remark: string;
      status: number;
      friend_name: string;
      friend_mobile: number;
      friend_avatar: string;
      friend_sex: number;
    }[]
  }[]
}

const state: State = {
  userInfo: {} as State['userInfo'],
  friends: [],
};

const mutations = {
  SET_USER_INFO(state: State, payload: { userInfo: State['userInfo'] }) {
    state.userInfo = payload.userInfo;
  },
  SET_USER_FRIENDS(state: State, payload: { friends: State['friends'] }) {
    state.friends = payload.friends;
  },
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
  async login({ commit, dispatch }: ActionContext<State, any>, { mobile, password}: { mobile: number, password: string }) {
    const [err, res] = await request({
      url: '/user/sign-in',
      method: 'PUT',
      data: {
        mobile,
        password,
      }
    });
    if (res && res.errno === 200) {
      await dispatch('getFriendsList');
      commit('SET_USER_INFO', { userInfo: res.data });
      uni.setStorage({
        key: 'token',
        data: res.data.token,
      });
      socket({ token: res.data.token }).setup();
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
      commit('SET_USER_INFO', { userInfo: res.data });
      socket({ token: res.data.token }).setup();
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
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
