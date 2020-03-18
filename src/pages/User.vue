<template>
  <div class="hm-user">
    <hm-header>个人中心</hm-header>
    <div class="info" @click="$router.push('/edit')">
      <div class="left">
        <img :src="$axios.defaults.baseURL + info.head_img" alt />
      </div>
      <div class="center">
        <span v-if="info.gender === 1" class="iconfont iconxingbienan"></span>
        <span v-else class="iconfont iconxingbienv"></span>
        <span class="nickname">{{ info.nickname }}</span>
        <p>{{ info.create_date | date }}</p>
      </div>
      <div class="right">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <hm-navbar title="我的关注" content="关注的用户"></hm-navbar>
    <hm-navbar title="我的跟帖" content="跟帖/回复"></hm-navbar>
    <hm-navbar title="我的收藏" content="文章/视频"></hm-navbar>
    <hm-navbar title="设置" @clickFn="$router.push('/edit')"></hm-navbar>
    <hm-navbar title="退出" @clickFn="logout"></hm-navbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {}
    };
  },
  created() {
    console.log("发送请求");
    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("user_id");
    this.$axios({
      url: `/user/+${user_id}`,
      method: "get",
      headers: {
        Authorization: token
      }
    }).then(res => {
      // console.log(res);
      const { message, statusCode, data } = res.data;

      if (statusCode === 200) {
        this.info = data;
      }
    });
  },
  methods: {
    logout() {
      console.log("退出");
      this.$dialog
        .confirm({
          title: "温馨提示",
          message: "你确定要退出系统吗？"
        })
        .then(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user_id");
          this.$router.push("/login");
          this.$toast.success("退出成功");
        })
        .catch(() => {
          this.$toast.success("退出取消");
        });
    }
  }
};
</script>

<style lang="less" scoped>
.info {
  display: flex;
  height: 100px;
  align-items: center;
  border-bottom: 3px solid #ccc;
  img {
    width: 60px;
    height: 60px;
    margin: 20px;
    border-radius: 50%;
  }
  .center {
    flex: 1;
    p {
      color: #999;
    }
    .nickname {
      font-size: 18px;
      color: #333;
    }
    .iconxingbienv {
      color: pink;
    }
    .iconxingbienan {
      color: skyblue;
    }
  }
  .right {
    width: 30px;
  }
}
</style>
