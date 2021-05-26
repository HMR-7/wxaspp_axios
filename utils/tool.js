import utils from "./utils"
// 节流函数
export const throttle = function throttle(fn, interval) {
    let enterTime = 0;
    let gapTime = interval || 3000;
    return function () {
        let that = this;
        let args = arguments;
        let backTime = new Date();
        if (backTime - enterTime > gapTime) {
            enterTime = backTime;
            fn.call(that, args);
        } else {
            utils.uniFuncs.uniToast("您的操作过快！", 'none')
        }
    };
}
// 防抖函数/模糊搜索
export const debounce = function debounce(fn, interval) {
    let timer;
    interval = interval || 1000;
    return function () {
        clearTimeout(timer);
        let that = this;
        let args = arguments;
        timer = setTimeout(function () {
            fn.call(that, args);
        }, interval);
    };
}
/* 模糊搜索/输入框延迟搜索->效果同上 */
export const blurSearch = function blurSearch(fn, waitTime) {
    let timeOutId = 0;
    waitTime = waitTime || 500;
    return function () {
        clearTimeout(timeOutId);
        console.log(waitTime);
        let t = this;
        let args = arguments;
        timeOutId = setTimeout(() => {
            fn.call(t, args)
        }, waitTime)
    }
}