import {
    checkRouterParams
} from "../class/class" //导入公共类
const utils = {
    /* 登录、授权、表单验证方法 */
    checkFuncs: {
        //检测是否登录
        checkLogin() {
            let flag = true,
                us = uni.getStorageSync('userInfo');
            if (!us) {
                flag = false
                utils.uniFuncs.uniModal("您还未登录，需要先去登录吗", (res) => {
                    utils.uniFuncs.uniChangePage('/pages/login/index', {}, 'redirectTo')
                })
            }
            return flag
        },
        //检查是否存在用户缓存数据 */
        checkUsInfo() {
            let flag = true,
                us = uni.getStorageSync('userInfo');
            flag = us ? us : false;
            return flag
        },
        //表单验证
        checkForm(value, type, msg = '') {
            let reg, type_name, code = 1;
            value = value.replace(/\s/g, ""); //去除所有空格
            switch (type) {
                case 'phone':
                    type_name = '手机号码'
                    reg = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/g
                    break;
                case 'id':
                    type_name = '身份证号'
                    reg = /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0[1-9]|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/
                    break;
                case 'wx':
                    type_name = '微信号'
                    reg = /^[0-9]|[a-zA-Z]|[-_a-zA-Z0-9]$/
                    break;
                case 'name':
                    type_name = '姓名'
                    reg = /^(?:[\u4e00-\u9fa5·]{2,16})$/
                    break;
            }
            if (!value) {
                msg = `请填写${type_name}`
                code = 0
            } else if (!reg.test(value)) {
                msg = `${type_name}格式不正确`
                code = 0
            }
            return {
                code: code,
                msg: msg
            }
        }
    },
    /* uni工具类方法 */
    uniFuncs: {
        // modal弹窗->modal_obj传入对象或者字符串都可以，key值要与default_modal_obj一致
        uniModal(modal_obj, confirmFn, cancelFn) {
            let default_modal_obj = {
                title: "温馨提示",
                content: "这是一个弹窗框",
                showCancel: true,
                cancelText: "取消",
                cancelColor: "#000",
                confirmText: "确定",
                confirmColor: "#ffc400"
            }
            cancelFn = cancelFn ? cancelFn : function () {
                return false
            };
            modal_obj = typeof modal_obj == "string" ? {
                content: modal_obj
            } : modal_obj;
            default_modal_obj = Object.assign(default_modal_obj, modal_obj)
            uni.showModal({
                ...default_modal_obj,
                success: function (res) {
                    const {
                        confirm,
                        cancel
                    } = res;
                    if (confirm) {
                        confirmFn()
                    } else if (cancel) {
                        cancelFn()
                    }
                }
            });
        },
        //toast提示框
        uniToast(title, icon = "none", mask = true, duration = 1000) {
            uni.showToast({
                title,
                icon,
                mask,
                duration,
            })
        },
        // 页面切换，url-页面绝对路径，jumpType-跳转方式，routerParams-跳转携带的参数
        uniChangePage(jump_url, jump_params = {}, jump_type = "navigateTo", ) {
            const {
                url
            } = new checkRouterParams(jump_url, jump_params, jump_type);
            const routerChange = {
                navigateTo: function () {
                    return uni.navigateTo({
                        url
                    });
                },
                redirectTo: function () {
                    return uni.redirectTo({
                        url
                    });
                },
                switchTab: function () {
                    return uni.switchTab({
                        url
                    });
                },
            };
            routerChange[jump_type]();
        },
        //动态设置页面标题
        uniSetNavTitle(title = "") {
            uni.setNavigationBarTitle({
                title
            });
        },
        //设置系统剪贴板的内容
        uniSetClipboardData(text) {
            let data = text;
            uni.setClipboardData({
                data,
                success: function () {
                    console.log("复制成功");
                }
            });
        },
        //快速拨打电话
        uniMakePhoneCall(phoneNumber) {
            const isString = typeof (phoneNumber) == 'string';
            if (!isString) {
                phoneNumber = JSON.stringify(phoneNumber)
            }
            uni.makePhoneCall({
                phoneNumber //仅为示例
            });
        },
        //用户登录获取js_code
        uniLogin() {
            return new Promise((resolve, reject) => {
                uni.login({
                    provider: "weixin",
                    success: function (res) {
                        if (res.code) {
                            resolve(res.code)
                        }
                    },
                    fail: function (res) {
                        resolve(res)
                    }
                });

            })
        },
        //获取用户地理位置授权弹窗
        uniGetLocation() {
            return new Promise((resolve, reject) => {
                uni.getLocation({
                    type: "gcj02",
                    success: function (res) {
                        resolve({
                            longitude: res.longitude,
                            latitude: res.latitude
                        })
                    },
                    fail: err => {
                        resolve({
                            longitude: '',
                            latitude: ''
                        })

                    }
                });
            })

        },
        //打开用户授权设置页面，type:用户授权类型
        uniAuthorize(type = "userLocation") {
            const authType = {
                userLocation: function () {
                    const _SCOPE = "scope.userLocation";
                    return _SCOPE;
                }
            }
            const scope = authType[type]()
            return new Promise((resolve, reject) => {
                uni.authorize({
                    scope,
                    success: res => {
                        console.log("地理位置已授权");
                    },
                    fail: res => {
                        utils.uniFuncs.uniModal("检测到您没打开获取地理位置权限，是否去设置打开？", function () {
                            uni.openSetting({
                                success: res => {
                                    console.log(res);
                                }
                            });
                        })
                    }
                });
            })
        },
        //清除全部缓存数据
        uniClearAllStoSync() {
            try {
                uni.clearStorageSync();
            } catch (e) {
                console.log(e);
            }
        },
        //存储缓存
        uniSetSotrageSycn(storage_key, storage_data) {
            uni.setStorageSync(storage_key, storage_data)
        },
        //清除指定storage_key缓存
        uniRemoveStorageSync(storage_key) {
            uni.removeStorageSync(storage_key)
        },
        //获取缓存内容=>默认获取缓存接口名数组
        uniGetStorageSync(storage_key = "pendingAjax") {
            return uni.getStorageSync(storage_key);
        },
        //分享-生命周期onShareAppMessage封装
        uniOnShareMessage(share_params, url, url_params) {
            const path = utils.handleObjFuncs.urlJoin(url, url_params);
            const SHAREOBJ = Object.assign(share_params, {
                path
            });
            return SHAREOBJ;
        },
        //选择图片上传的封装
        uniChooseImage(count = 1, sizeType = ["compressed"], sourceType = false) {
            return new Promise((resolve, reject) => {
                uni.chooseImage({
                    count, //默认1,单图上传
                    sizeType, //可以指定是原图还是压缩图，默认二者都有
                    sourceType: !sourceType ? ["camera ", "album"] : [sourceType], //从相册选择
                    success: function (res) {
                        let fileLength = res.tempFilePaths.length; //文件数组长度
                        let tempFilePaths = res.tempFilePaths; //当前文件临时路径
                        let tempFiles = res.tempFiles; //文件
                        const file_obj = {
                            tempFilePaths,
                            tempFiles,
                            fileLength
                        }
                        resolve(file_obj)
                    }
                });
            })

        }
    },
    /* 对象处理方法 */
    handleObjFuncs: {
        // 若对象(obj)为null或者undefined或者''时候，转化为自定义字符串(defaultData)或者直接删除
        replaceNull: function (obj, defaultData = '', del = false) {
            del ? true : false
            if (typeof obj === 'object') {
                Object.keys(obj).forEach(ele => {
                    let val = obj[ele];
                    if (val === null || val === undefined || val === '') {
                        !del ? obj[ele] = defaultData : delete obj[ele]; // 符合条件替换对象值
                    } else if (typeof val === 'object') {
                        utils.handleObjFuncs.replaceNull(val);
                    }
                });
            }
            return obj;
        },
        //ES6—Reflect方式实现深拷贝
        deepClone(obj) {
            function isObject(exp) {
                return Object.prototype.toString.call(exp) == '[object Object]'
            }
            if (!isObject(obj)) {
                throw new Error('obj 不是一个对象！')
            }
            let isArray = Array.isArray(obj)
            let cloneObj = isArray ? [...obj] : {
                ...obj
            }
            Reflect.ownKeys(cloneObj).forEach(key => {
                cloneObj[key] = isObject(obj[key]) ? utils.handleObjFuncs.deepClone(obj[key]) : obj[key]
            })
            return cloneObj
        },
        //删除对象中的
        delectObjKey(obj, key) {
            delete obj[key]
            return obj;
        },
        //链接自动合并传递参数
        urlJoin(url, url_params) {
            url = new checkRouterParams(url, url_params);
            return url;
        }
    },
    /* 页面处理方法 */
    commFuncs: {
        //创建当前页面需要携带回的数据-1(A跳到B,在B页面使用此函数->测试阶段)
        createPrePageData(pre_page_data) {
            let pages = getCurrentPages(); //获取所有页面栈实例列表
            let prevPage = pages[pages.length - 2]; //上一页页面实例
            prevPage.$vm.getPrePageData(pre_page_data); //修改上一页data里面的searchVal参数值为1211
            uni.navigateBack({
                delta: 1
            });
        },
        //获取上一个页面返回的参数，需要去上方函数一起使用(A跳到B,在页面使用此函数->测试阶段)
        getPrePageData(pre_data) {
            console.log(pre_data);
            if (pre_data) {
                return pre_data;
            }
        }
    },
    /* 通用js方法 */
    normalFuncs: {
        //格式化金钱=>20210202=>20,210,202
        formatMoney(money) {
            return money = money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        //生成随机ID=>len:随机数长度
        randomId(len) {
            return Math.random().toString(36).substr(3, len);
        },
        //生成随机HEX颜色值
        RandomColor() {
            return "#" + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0");
        },
        //生成指定范围随机数
        RandomNum(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    },
    /* 清除pendingAjax接口缓存(旧版本，暂不使用) */
    removeAjaxStorage: {
        //清除pendingAjax缓存
        removePendingStorage(storage_key = "pendingAjax") {
            const pendingAjax = utils.uniFuncs.uniGetStorageSync(storage_key),
                pending_len = pendingAjax.length;
            if (!pending_len) return;
            utils.uniFuncs.uniRemoveStorageSync(storage_key);
            for (let i = 0; i < pending_len; i++) {
                utils.uniFuncs.uniRemoveStorageSync(pendingAjax[i]);
            }
        },
    },
}
export default utils