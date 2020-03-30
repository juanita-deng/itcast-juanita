<template>
  <div class="hm-search">
    <div class="header">
      <div class="left" @click="back">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="center">
        <div class="iconfont iconsearch"></div>
        <input
          @input="recommend"
          v-model="keyword"
          type="text"
          placeholder="请输入关键字"
          @keyup.enter="search"
        />
      </div>
      <div class="right" @click="search">搜索</div>
    </div>
    <!-- 推荐列表 -->
    <div class="hm-recommend" v-if="recommendList.length > 0">
      <span
        @click="history_search(item.title)"
        v-for="item in recommendList"
        :key="item.id"
      >{{item.title}}</span>
      <span class="iconfont iconjiantou1"></span>
    </div>

    <!-- 文章组件 -->
    <div class="hm-article" v-else-if="searchList.length > 0">
      <hm-post :article="item" v-for="item in searchList" :key="item.id"></hm-post>
    </div>

    <div class="content" v-else>
      <div class="history">
        <div class="title">历史搜索</div>
        <div class="list">
          <div
            class="item"
            @click="history_search(item)"
            v-for="item in history"
            :key="item"
          >{{item}}</div>
        </div>
      </div>

      <div class="hot">
        <div class="title">热门搜索</div>
        <div class="list">
          <div class="item" @click="history_search(item)" v-for="item in hot" :key="item">{{item}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  data() {
    return {
      keyword: "",
      searchList: [],
      history: [],
      hot: [],
      recommendList: []
    };
  },
  created() {
    this.hot = ["关晓彤", "复工", "意大利疫情", "美女"];
    this.history = JSON.parse(localStorage.getItem("history")) || [];
  },
  methods: {
    async search() {
      //搜索时，关闭推荐
      this.recommendList = []; //则点击推荐列表才会跳到文章组件
      //在将关键字添加到历史列表之前判断历史列表中
      //是否还有这个历史记录,如果有先删除(filter)
      this.history = this.history.filter(v => v !== this.keyword);
      //发送搜索ajax请求前把搜索的keyword保存到历史列表中
      this.history.unshift(this.keyword);
      localStorage.setItem("history", JSON.stringify(this.history));

      const res = await this.$axios.get("/post_search", {
        params: {
          keyword: this.keyword
        }
      });
      // console.log(res);
      const { statusCode, data } = res.data;
      if (statusCode === 200) {
        this.searchList = data;
        // console.log(this.searchList);
      }
    },
    history_search(item) {
      // console.log(item);
      this.keyword = item;
      this.search();
    },
    back() {
      if (this.keyword) {
        this.keyword = "";
      } else {
        this.$router.push("/");
      }
    },
    recommend: _.debounce(async function() {
      console.log("我触发了input事件");

      if (!this.keyword) {
        return;
      }
      const res = await this.$axios.get("/post_search_recommend", {
        params: {
          keyword: this.keyword
        }
      });
      // console.log(res);
      const { statusCode, data } = res.data;
      if (statusCode === 200) {
        this.recommendList = data;
        // console.log(this.recommendList);
      }
    }, 500)
  },
  watch: {
    keyword(value) {
      if (!value) {
        this.searchList = [];
        this.recommendList = [];
      }
    }
  }
};
</script>

<style lang="less" scoped>
.hm-search {
  padding: 5px 20px;
  .header {
    display: flex;
    justify-content: center;
    text-align: center;
    height: 30px;
    line-height: 30px;
    .left {
      padding: 0 10px;
    }
    .center {
      flex: 1;
      position: relative;
      text-align: center;
      input {
        width: 100%;
        border-radius: 20px;
        text-indent: 30px;
        color: #999;
        font-size: 12px;
        border: 1px solid #ccc;
      }
      .iconsearch {
        position: absolute;
        left: 10px;
      }
    }
    .right {
      padding: 0 10px;
      font-size: 12px;
    }
  }
  .hm-recommend {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ccc;
    font-size: 12px;
    color: #999;
    display: flex;
    justify-content: space-between;
  }
  .content {
    .title {
      font-size: 16px;
      font-weight: 700;
      padding: 20px 0;
    }
    .list {
      overflow: hidden;
      .item {
        float: left;
        padding: 10px 15px;
        background-color: #ddd;
        margin-right: 10px;
        margin-bottom: 10px;
        font-size: 12px;
      }
    }
  }
}
</style>
