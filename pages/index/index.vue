<template>
  <view class="content">
    <view class="header-swiper">
      <swiper-box :funcType="'toBannerUrl'"></swiper-box>
    </view>
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
  </view>
</template>

<script>
/* 导入接口 */
/* 导入路径 */
/* 导入节流、防抖函数 */
/* 导入模拟数据 */
/* 导入自定义组件 */
import swiperBox from "@/components/swiper";
/* 导入状态管理store */
export default {
  components: {
    swiperBox
  },
  data() {
    return {
      title: "首页"
    };
  },
  onLoad() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .header-swiper {
    width: 100%;
    height: 380rpx;
  }

  .logo {
    height: 200rpx;
    width: 200rpx;
    margin-top: 200rpx;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50rpx;
  }

  .text-area {
    display: flex;
    justify-content: center;
  }

  .title {
    font-size: 36rpx;
    color: #8f8f94;
  }
}
</style>
