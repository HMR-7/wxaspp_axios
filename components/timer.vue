<template>
  <view class="content">
    <view>{{codeContent}}</view>
  </view>
</template>

<script>
/* 导入接口 */
/* 导入路径 */
/* 导入节流、防抖函数 */
/* 导入模拟数据 */
/* 导入自定义组件 */
/* 导入状态管理store */
let codeTime = 5; //定时器时间
export default {
  props: {
    PROP_params: Object,
    count: Number,
  },
  data() {
    return {
      isOver: false, //倒计时初始状态
      codeContent: "获取验证码",
    };
  },
  onPullDownRefresh() {
    uni.stopPullDownRefresh();
  },
  onReachBottom() {},
  onShow() {},
  onLoad() {},
  methods: {
    timerFuncs() {
      let t = this;
      if (t.isOver) return;
      try {
        uni.hideLoading();
        if (true) {
          /* 验证码定时器 */
          let clock = setInterval(() => {
            codeTime--;
            t.codeContent = codeTime + "s后再试";
            if (codeTime < 0) {
              //当倒计时小于0时清除定时器
              clearInterval(clock);
              //   clearTimeout(block);
              t.codeContent = "重发验证码";
              codeTime = time;
              t.isOver = false;
            }
          }, 1000);
          uni.showToast({
            icon: "none",
            title: "发送成功",
            duration: 3000,
          });
          t.isOver = true;
        } else {
          t.isOver = true;
          t.$u.showToast(msg);
        }
      } catch (error) {
        t.$u.showToast("倒计时失败,请稍后重试！");
        uni.hideLoading();
      }
    },
  },
};
</script>
<style lang='scss' scoped>
.content {
}
</style>