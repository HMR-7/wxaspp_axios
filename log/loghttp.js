function request(api_name, params = {}, method = 'post') {
    // 存储每个请求的标识
    const baseUrl = "http:127.0.0.1:5000/";
    let url = baseUrl + api_name,
        data = params;
    return new Promise((resolve, reject) => {
        uni.request({
            url, //请求路径
            data, //请求参数
            method, //请求方式
            success({
                statusCode,
                data: r_data
            }) {
                if (statusCode == 200) {
                    const result = {
                        flag: r_data.flag,
                        code: r_data.code,
                        msg: r_data.msg
                    };
                    resolve(result);
                }
            },
            complete(res) {
                let status = res.status,
                    statusCode = res.statusCode,
                    errMsg = res.errMsg;
                const IS_TIMEOUT = errMsg.lastIndexOf('timeout') != -1;
                const IS_FAIL = res.errMsg.lastIndexOf('fail') != -1;
                if (status == 500 && IS_TIMEOUT) {
                    console.log('网络请求超时，请稍后重试');
                }
                if (status == 500 || statusCode == 500 || statusCode == 404 || IS_FAIL) {
                    console.log('您的网络异常，请稍后重试')
                }
            }
        })
    })
}

export default request