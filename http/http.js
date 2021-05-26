import service from "../lib/axios"
import {
    isHmr
} from "../siteinfo/siteinfo"
let IS_HMR = isHmr; //isHmr-自定义是否开启重复请求单独开关,默认true全局开启
function request(url, params = {}, method = "get", isHmr = IS_HMR) {
    params.isHmr = isHmr;
    if (method == "get") {
        return new Promise((resolve, reject) => {
            resolve(service.get(url, {
                params
            }))
        })
    }
    if (method == "post") {
        return new Promise((resolve, reject) => {
            resolve(service.post(url, params))
        })
    }
}
export default request