import {
    insert_log,
    insert_none_log
} from "./api"
import utils from "../utils/utils"
const showStatus = {
    // error400: function () {
    //     return message = '请求错误(400)';
    // },
    // error401: function () {
    //     return message = '未授权，请重新登录(401)';
    // },
    // error403: function () {
    //     return message = '拒绝访问(403)';
    // },
    // error404: function () {
    //     return message = '请求出错(404)';
    // },
    // error405: function () {
    //     return message = '请求方式错误(405)';
    // },
    // error408: function () {
    //     return message = '请求超时(408)';
    // },
    error50050: async function (code) {
        let params = {
            api_name: req_params.url, //接口名
            code,
            debug_megs: "这又一条错误日志"
        }
        console.log(params);
        await insert_log(params);
    },
    error50010: async function (code, req_params) {
        let params = {
            id: req_params.id,
            api_name: req_params.url, //接口名
            code,
            debug_megs: "商品不存在"
        }
        await insert_none_log(params);
        utils.uniFuncs.uniModal(params.debug_megs, () => {
            uni.navigateBack({
                delta: 1
            });
        })
    },
    // error501: function () {
    //     return message = '服务未实现(501)';
    // },
    // error502: function () {
    //     return message = '网络错误(502)';
    // },
    // error503: function () {
    //     return message = '服务不可用(503)';
    // },
    // error504: function () {
    //     return message = '服务不可用(504)';
    // },
    // error505: function () {
    //     return message = 'HTTP版本不受支持(505)';
    // },
    // errorElse: function () {
    //     return message = '您的网络异常，请稍后重试！'
    // }
}

export default showStatus