import { ActionContext } from 'vuex';
import request from '../../helper/request';
import Chat from '../../socket/chat';

declare let uni: any;

interface FriendInfo {
  uid: number;
  friend_id: number;
  remark: string;
  status: number;
  friend_name: string;
  friend_mobile: number;
  friend_avatar: string;
  friend_sex: number;
}
interface UserInfo {
  id: number;
  name: string;
  mobile: number;
  avatar: string;
  status: number;
  token: string;
}
interface State {
  userInfo: UserInfo;
  allFriendsMap: {
    [index: number]: FriendInfo;
  };
  friends: {
    key: string; // 用户名首字母
    list: number[]
  }[];
}

const state: State = {
  userInfo: {} as UserInfo,
  allFriendsMap: {},
  friends: [],
};

const mutations = {
  SET_USER_INFO(state: State, payload: { userInfo: UserInfo }) {
    state.userInfo = payload.userInfo;
  },
  SET_USER_FRIENDS(state: State, payload: { friends: { key: string; list: FriendInfo[] }[] }) {
    const { friends } = payload;
    const map = {};
    const tmp = friends.map(item => {
      const { key, list } = item;
      return {
        key,
        list: list.map(l => {
          map[l.friend_id] = l;
          return l.friend_id;
        }),
      }
    });
    state.friends = tmp;
    state.allFriendsMap = map;
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
      Chat.getInstance().setup({ token: res.data.token });
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
      Chat.getInstance().setup({ token: res.data.token });
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
