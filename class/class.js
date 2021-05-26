/* 路径参数拼接公共类 */
export class checkRouterParams {
    constructor(url, jump_params, jump_type) {
        const URL_FLAG =
            url.indexOf("?") == -1;
        const keys_arr = Object.keys(jump_params);
        const keys_length = keys_arr.length;
        let accType;
        if (!Boolean(jump_params) || jump_type == "switchTab") {
            return {
                url
            };
        }
        for (let i = keys_length; i--;) {
            const routerKey = [keys_arr[i]];
            const routerVla = jump_params[keys_arr[i]];
            URL_FLAG ? accType = i == keys_length - 1 ? '?' : '&' : accType = '&';
            url = `${url+ accType +routerKey+'='+routerVla}`;
        }
        return {
            url
        }
    };
}
