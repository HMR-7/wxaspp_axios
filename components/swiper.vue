<template>
  <swiper
    class="swiper"
    :indicator-dots="true"
    :autoplay="true"
    :circular="true"
    :interval="3000"
    :duration="1000"
    indicator-color="#95A0B6"
    indicator-active-color="#020433"
  >
    <swiper-item
      class="swiperItem"
      v-for="(swiperItem, swiperIndex) in swiperList ? swiperList : [1, 2, 3]"
      :key="swiperIndex"
      @tap="tapFuncs(funcType, default_picture)"
    >
      <image :src="swiperItem.picture ? swiperItem.picture : default_picture" />
    </swiper-item>
  </swiper>
</template>

<script>
export default {
  props: { swiperList: Object, height: String, funcType: String },
  data() {
    return {
      default_picture: "../static/images/logo.png"
    };
  },
  onShow() {},
  mounted() {},
  methods: {
    tapFuncs(tapType, default_picture) {
      if (!Boolean(tapType)) {
        return;
      }
      console.log(default_picture);
      let t = this;
      const tapTypes = {
        preview: function() {
          t.getPreviewImage(default_picture);
        },
        toBannerUrl: function() {
          t.goToBannerUrl();
        }
      };
      tapTypes[tapType]();
    },
    getPreviewImage(urls) {
      if (!(urls instanceof Array)) {
        urls = [urls];
      }
      uni.previewImage({
        current: 0,
        urls,
        longPressActions: {
          itemList: ["发送给朋友", "保存图片", "收藏"],
          success: function(data) {
            console.log(
              "选中了第" +
                (data.tapIndex + 1) +
                "个按钮,第" +
                (data.index + 1) +
                "张图片"
            );
          },
          fail: function(err) {
            console.log(err.errMsg);
          }
        }
      });
    },
    goToBannerUrl(swiperItem) {
      console.log(swiperItem, "swiperItemswiperItem");
      return;
      let t = this,
        link = swiperItem.link;
      if (!Boolean(link)) return;
      return t.$u.uniFuncs.uniChangePage;
    }
  }
};
</script>
<style lang='scss' scoped>
.swiper {
  width: 100%;
  height: 100%;
  .swiperItem {
    width: 100%;
    height: 100%;
    image {
      width: 100%;
      height: 100%;
    }
  }
}
</style>