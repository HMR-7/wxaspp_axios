<template>
  <view class="content">
    <view class="header"></view>
    <view class="container"></view>
    <view @tap.stop="toLogin" style="text-align:center">登录页</view>
  </view>
</template>

<script>
/* 导入接口 */
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
  onLoad() {},
  methods: {
    toLogin() {
      let t = this,
        { uniChangePage } = t.$u.uniFuncs,
        jump_url = "/pages/login/index",
        jump_type = "redirectTo";
      uniChangePage(jump_url, {}, jump_type);
    }
  }
};
</script>
<style lang='scss' scoped>
.content {
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  .header {
    margin: 0 40rpx;
    height: 160rpx;
    border: 1rpx solid blue;
    border-top-left-radius: 16rpx;
    border-top-right-radius: 16rpx;
  }
  .container {
    margin: 0 40rpx;
    height: 100rpx;
    border-radius: 10rpx;
    border: 1rpx solid red;
  }
}
</style>