import axios from 'axios' //引入axios
import adapter from "./adapter" //基于uni的请求适配器
import axiosError from "./axiosError" //统一处理重复请求
import showStatus from "../log/log" //统一收集错误日志
import * as api from "../siteinfo/siteinfo" //host公共参数配置文件
import {
    addPendingAjax,
    removePendingAjax
} from "../class/axiospending"
//axios公共参数配置 
const service = axios.create({
    headers: api.config.headers,
    baseURL: api.config.url,
    timeout: api.config.timeout,
    crossDomain: true
})
// 存储每个请求的标识和取消的函数
const pendingAjax = new Map();
//请求拦截器,在请求之前做一些处理
service.interceptors.request.use(config => {
    let pendingMap;
    console.log('请求拦截成功=>', config)
    if (config.isHmr) {
        return Promise.reject({
            msg: "重复请求"
        });
    }
    //如果这里不配置，node后台接收将为空
    if (config.method === 'post') {
        config.params = config.data;
    }
    // 是否全局开启拦截重复请求功能
    if (api.config.cancelDuplicated) {
        new removePendingAjax(config, pendingAjax);
        pendingMap = new addPendingAjax(config, pendingAjax);
        if (config.isHmr) {
            return Promise.reject({
                msg: "重复请求"
            });
        }
        config.duplicatedKey = pendingMap.duplicatedKey;
        config.pendingAjax = pendingMap.pendingAjax;
    }
    config.duplicatedKey = pendingMap.duplicatedKey;
    config.pendingAjax = pendingMap.pendingAjax;
    //获取用户信息公共参数
    const userInfo = uni.getStorageSync('userInfo');
    if (userInfo) {
        const {
            id: user_id
        } = userInfo;
        config.params = Object.assign(config.params, {
            user_id
        })
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
//响应拦截器，接收返回值之前做一些处理
service.interceptors.response.use((res) => {
    let code = res.code,
        req_params = res.config.params;
    req_params.url = res.config.url;
    if (res.status == 200 && code == 1) {
        console.log("响应成功");
        return Promise.resolve(res.data)
    } else {
        const type = 'error' + String(code);
        code == 50010 ? showStatus[type](code, req_params) : showStatus[type](code, req_params);
        return false;
    }
}, error => axiosError(error)); //axiosError统一处理服务器code码
// 请求适配器
service.defaults.adapter = adapter;
export default service