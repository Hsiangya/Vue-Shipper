"use strict";
import axios from "axios";
import store from "@/store";
import router from "@/router";
import {ElMessage} from "element-plus";
// Full config:  https://github.com/axios/axios#request-config
axios.defaults.baseURL = "http://127.0.0.1:8000/";
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
let config = {
    // baseURL: process.env.baseURL || process.env.apiUrl || ""
    // timeout: 60 * 1000, // Timeout
    // withCredentials: true, // Check cross-site Access-Control
};

// 创建axios对象
const _axios = axios.create(config);

// 请求拦截器
_axios.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        const token = localStorage.getItem("token")
        if (token) {
            // 携带请求头
            config.headers.common['Authorization'] = token;
        }
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
_axios.interceptors.response.use(
    function (response) {
        // Do something with response data
        return response;
    },
    function (error) {
        // Do something with response error
        // console.log(error.response.status)
        // console.log("1111")
        if (error.response.status === 403) {
            store.commit("logout");
            router.replace({name: "Login"});
            ElMessage.error("登录已过期，请重新登录");
        }
        return Promise.reject(error);
    }
);

export function installAxios(Vue) {
    Vue.config.globalProperties.$axios = _axios;
}
