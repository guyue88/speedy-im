import { ActionContext } from 'vuex';
import request from '../../helper/request';

declare let uni: any;

interface State {
  token: string;
  userInfo: {
    id: number;
    name: string;
    mobile: number;
    avatar: string;
    status: number;
  }
}

const state: State = {
  token: '',
  userInfo: {} as State['userInfo'],
};

const mutations = {
  SET_USER_INFO(state: State, payload: { userInfo: State['userInfo'] }) {
    state.userInfo = payload.userInfo;
  },
  SET_TOKEN(state: State, payload: { token: string }) {
    state.token = payload.token;
  }
};

const actions = {
  async login({ commit }: ActionContext<State, any>, { mobile, password}: { mobile: number, password: string }) {
    const [err, res] = await request({
      url: '/user/sign-in',
      method: 'PUT',
      data: {
        mobile,
        password,
      }
    });
    if ( res && res.errno === 200) {
      commit('SET_USER_INFO', { userInfo: res.data.userInfo });
      commit('SET_TOKEN', { token: res.data.token });
      uni.setStorage({
        key: 'token',
        data: res.data.token,
      });
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
  async autoLogin({ commit }: ActionContext<State, any>) {
    const [err, res] = await request({
      url: '/user/info',
    });
    if (res && res.errno === 200) {
      commit('SET_USER_INFO', { userInfo: res.data.userInfo });
      commit('SET_TOKEN', { token: res.data.token });
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
