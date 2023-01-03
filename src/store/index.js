import {createStore} from 'vuex'

export default createStore({
  state: {
    // 获取数据
    name: localStorage.getItem('name') || "",
    token: localStorage.getItem('token') || "",
  },
  getters: {},
  mutations: {
    // 登陆时记录token数据与name，参数解包
    login(state, {name, token}) {
      state.name = name;
      state.token = token;

      //保存在localStorage中
      localStorage.setItem('name', name);
      localStorage.setItem('token', token);
    },

    // 登出时清除数据
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
