"use strict";
import axios from "axios";
import store from "@/store";
import router from "@/router";
import {ElMessage} from "element-plus";

let config = {};

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
        if (error.response.code === 3001) {
            store.commit("logout");
            router.replace({name: "Login"});
            ElMessage.error("认证失败，请重新登录");
        }
        return Promise.reject(error);
    }
);

export function installAxios(Vue) {
    Vue.config.globalProperties.$axios = _axios;
}
