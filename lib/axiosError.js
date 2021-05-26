import utils from "../utils/utils"

function axiosError(error) {
    console.log(error, 'errorerrorerror');
    return new Promise((resolve, reject) => {
        if (error.msg === "重复请求") {
            const domain = process.env.NODE_ENV === 'development' ? 1 : 0;
            if (domain) {
                utils.uniFuncs.uniModal("请勿重复发送请求", () => {
                    return false
                }); //测试->弹出服务器错误信息
            }
            return false
        }
    })
}

export default axiosError