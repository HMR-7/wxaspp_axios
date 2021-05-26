<template>
  <view class="content">
    <view
      :style="currentPage == item ? 'border-bottom:2rpx solid blue;' : ''"
      class="limit-box"
      v-for="(item, index) in pageArr"
      :key="index"
      @tap="selPage(item)"
    > 
      <span :style="currentPage == item ? 'color:blue' : ''">
        {{ item }}
      </span>
    </view>
  </view>
</template>

<script>
export default {
  props: { sumPage: Number /* 数组总量 */, limit: Number /* 每页显示个数 */ },
  data() {
    return {
      pageArr: [],
      currentPage: 1
    };
  },
  mounted() {
    this.pageLimit();
  },
  methods: {
    pageLimit() {
      let pageArr = []; //页码数组
      const sumPage = this.sumPage, //数据总量
        limit = this.limit ? this.limit : 10, //每页显示数据数量
        pageNum = Math.ceil(sumPage / limit); //总页数
      if (pageNum < 7) {
        pageArr = [1, 2, 3, 4, 5, 6];
      } else {
        const currentPage = this.currentPage; //当前所在页数
        if (currentPage < 4) {
          pageArr = [1, 2, 3, 4, "...", pageNum];
        } else if (currentPage >= 4 && currentPage <= pageNum - 3) {
          pageArr = [
            1,
            "...",
            currentPage - 1,
            currentPage,
            currentPage + 1,
            "...",
            pageNum
          ];
        } else {
          pageArr = [1, "...", pageNum - 3, pageNum - 2, pageNum - 1, pageNum];
        }
      }
      this.pageArr = pageArr;
    },
    selPage(currentPage) {
      if (currentPage != "...") {
        this.currentPage = currentPage;
        this.pageLimit();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  /* 页码样式 */
  .limit-box {
    margin-left: 10rpx;
    width: 40rpx;
    height: 40rpx;
    line-height: 40rpx;
    font-size: 28rpx;
    text-align: center;
    box-sizing: border-box;
    &:first-child {
      margin-left: 0;
    }
  }
}
</style>
