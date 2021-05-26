<template>
  <view class="Login">
    <!-- 顶部logo -->
    <view class="logo">
      <image src="../../static/images/logo.png" />
    </view>
    <view @tap="testLink()">
      跳转测试
    </view>
    <!-- 手机登录 -->
    <view class="form">
      <!-- 手机号 -->
      <view class="phone-num">
        <view class="num-left-icon">2</view>
        <view class="input">3</view>
        <view class="send-btn">发送验证码</view>
      </view>
      <!-- 验证码 -->
      <view class="phone-code">
        <view class="ccode-left-icon"></view>
        <view class="code-left-icon"></view>
      </view>
      <!-- 登录按钮 -->
      <view class="form-login-btn">
        手机验证登录
      </view>
    </view>
    <!-- 微信快捷登录 -->
    <button
      class="wChat-quick-login"
      open-type="getUserInfo"
      @getuserinfo="handleGetUserInfo($event)"
    >
      微信快捷登录
    </button>
    <!-- <view @tap="login">
      {{ wChat_login_txt }}
    </view> -->
  </view>
</template>

<script>
/* 导入接口 */
// import { userLogin /* 用户登录 */ } from "./api/api";
/* 导入路径 */
/* 导入节流、防抖函数 */
/* 导入模拟数据 */
/* 导入自定义组件 */
/* 导入状态管理store */
export default {
  components: {},
  data() {
    return {
      params: {
        js_code: ""
      }
    };
  },
  onShow() {},
  onLoad() {
    this.getJs_code();
  },
  methods: {
    async getJs_code() {
      let t = this,
        { uniLogin } = { ...t.$u.uniFuncs };
      t.params.js_code = await uniLogin();
    },
    async handleGetUserInfo(e) {
      let t = this,
        { uniToast } = { ...t.$u.uniFuncs },
        detail = e.detail,
        params = t.params;
      if (detail.userInfo) {
        params.encryptedData = detail.encryptedData;
        params.iv = detail.iv;
        t.toLogin(params);
      } else if (detail.errMsg === "getUserInfo:fail auth deny") {
        t.getJs_code();
        uniToast("请您同意登录授权,以便我们更好地为您服务");
      }
    },
    async toLogin(params) {
      let t = this,
        { uniToast, uniChangePage } = { ...t.$u.uniFuncs };
      try {
        /* let { code, data, msg } = await userLogin(params);
        const userInfo = data.data;
        uni.setStorageSync("userInfo", userInfo);
        uniToast("登陆成功");
        setTimeout(() => {
          uniChangePage("/pages/index/index", "switchTab");
        }, 600); */
      } catch (err) {
        console.warn(`err${err}`);
        t.getJs_code();
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.Login {
  padding-top: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  .logo {
    width: 160rpx;
    height: 160rpx;
    border-radius: 50%;
    overflow: hidden;

    image {
      width: 100%;
      height: 100%;
    }
  }
  .form {
    width: 80%;
    border-radius: 20rpx;
    border: 1rpx solid red;
    .phone-num {
      display: flex;

      .num-left-icon {
      }
      .input {
      }
      .send-btn {
      }
    }
  }
  .wChat-quick-login {
    padding: 15rpx 0;
    position: fixed;
    bottom: 20vh;
    width: 90%;
    text-align: center;
    color: #fff;
    font-size: 28rpx;
    background-color: #4e9646;
    border-radius: 10rpx;
  }
}
</style>