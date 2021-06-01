<template>
  <view class="content">
    <view class="canvas_show">
      <canvas canvasId="shareCanvas" :style="'width:' + width + 'px;height:' + height + 'px'"></canvas>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    width: Number /* 画布宽度 */,
    height: Number /* 画布高度 */,
    imgObj: Object /* 海报图大小位置对象 */,
    qrCodeObj: Object /* 二维码大小位置对象 */,
  },
  data() {
    return {};
  },
  onPullDownRefresh() {
    uni.stopPullDownRefresh();
  },
  onReachBottom() {},
  mounted() {},
  methods: {
    /* 生成海报 */
    creat_img() {
      uni.showLoading({
        title: "生成海报中",
        mask: true,
      });
      let t = this,
        { x, y, width, height } = t.imgObj,
        { x: q_x, y: q_y, width: q_width, height: q_height } = t.qrCodeObj;
      const ctx = uni.createCanvasContext("shareCanvas", t);
      ctx.drawImage("/static/images/logo.png", x, y, width, height); //绘制黑色背景图
      ctx.drawImage("/static/images/pic_hd.png", q_x, q_y, q_width, q_height); //绘制黑色背景图
      setTimeout(function () {
        ctx.draw(true, t.canvasToTempFilePath());
      }, 200);
    },
    canvasToTempFilePath(type) {
      let t = this,
        width = t.width,
        height = t.height;
      setTimeout(function () {
        uni.canvasToTempFilePath(
          {
            x: 0,
            y: 0,
            width,
            height,
            fileType: "png",
            quality: 1,
            canvasId: "shareCanvas",
            success: function (res) {
              uni.hideLoading();
              t.shareImg = res.tempFilePath;
              console.log(t.shareImg);
              if (t.shareImg) {
                uni.previewImage({
                  current: t.shareImg, // 当前显示图片的http链接
                  urls: [t.shareImg], // 需要预览的图片http链接列表
                  success() {
                    setTimeout(function () {
                      uni.hideLoading();
                    }, 600);
                  },
                });
              }
            },
            fail(res) {
              console.log(res);
            },
          },
          t
        );
      }, 1000);
    },
  },
};
</script>
<style lang='scss' scoped>
.content {
  width: 100%;
  height: 1200rpx;
  border: 1rpx solid red;
  box-sizing: border-box;
  .canvas_show {
    width: 100%;
    height: 100%;
  }
}
</style>