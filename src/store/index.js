import {createStore} from 'vuex'

export default createStore({
  state: {
    name: localStorage.getItem('name') || "",
    token: localStorage.getItem('token') || "",
  },
  getters: {},
  mutations: {
    login(state, {name, token}) {
      state.name = name;
      state.token = token;

      //保存在localStorage中
      localStorage.setItem('name', name);
      localStorage.setItem('token', token);
    },
    logout(state) {
      state.name = "";
      state.token = "";
      //localStorage清除
      localStorage.removeItem('name');
      localStorage.removeItem('token');
    },
  },
  actions: {},
  modules: {}
})
