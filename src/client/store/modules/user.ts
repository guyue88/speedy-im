import { ActionContext } from 'vuex';
import request from '../../helper/request';

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

};

const actions = {
  login({ commit }: ActionContext<State, null>, payload: { mobile: number, password: string }) {

  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
