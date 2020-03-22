<template>
  <div class="hm-edit">
    <hm-header>编辑资料</hm-header>
    <!-- avatar头像 -->
    <div class="hm-avatar">
      <img :src="$axios.defaults.baseURL + info.head_img" alt />
      <!-- 图片上传组件 -->
      <van-uploader :after-read="afterRead" class="uploader" />

      <!-- 裁剪图片的遮罩 -->
      <div class="mask" v-show="show4">
        <van-button type="info" class="cancel" @click="cancel">取消</van-button>
        <van-button type="primary" class="crop" @click="crop">裁剪</van-button>
        <vue-cropper
          ref="cropper"
          :img="img"
          :autoCrop="true"
          :autoCropWidth="150"
          :autoCropHeight="150"
          :fixed="true"
        ></vue-cropper>
      </div>
    </div>

    <hm-navbar title="昵称" :content="info.nickname" @clickFn="showNickname"></hm-navbar>
    <hm-navbar title="密码" :content="info.password | password" @clickFn="showPassword"></hm-navbar>
    <hm-navbar title="性别" :content="info.gender === 1 ? '男' : '女'" @clickFn="showGender"></hm-navbar>

    <!-- 以下为弹窗的vant-ui组件 -->
    <!-- 修改昵称的弹窗 -->
    <van-dialog v-model="show1" title="修改昵称" show-cancel-button @confirm="editNickname">
      <van-field v-model="nickname" placeholder="请输入昵称" />
    </van-dialog>

    <!-- 修改密码的弹窗 -->
    <van-dialog v-model="show2" title="修改密码" show-cancel-button @confirm="editPassword">
      <van-field v-model="password" placeholder="请输入密码" />
    </van-dialog>

    <!-- 修改性别的弹窗 -->
    <van-dialog v-model="show3" title="修改性别" show-cancel-button @confirm="editGender">
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender = 1">
            <van-radio slot="right-icon" :name="1" />
          </van-cell>
          <van-cell title="女" clickable @click="gender = 2">
            <van-radio slot="right-icon" :name="2" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
  </div>
</template>

<script>
import { VueCropper } from "vue-cropper";
export default {
  data() {
    return {
      info: {},
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      nickname: "",
      password: "",
      gender: "",
      head_img: "",
      img: ""
    };
  },
  components: {
    VueCropper
  },
  created() {
    this.getInfo();
  },
  filters: {
    password(input) {
      if (input) {
        return input.replace(/./g, "*");
      } else {
        return "";
      }
    }
  },
  methods: {
    async getInfo() {
      const user_id = localStorage.getItem("user_id");
      const res = await this.$axios({
        url: "/user/" + user_id,
        method: "get"
      });
      // .then(res => {

      // console.log(res.data);
      const { statusCode, message, data } = res.data;
      if (statusCode === 200 && message === "获取成功") {
        this.info = data;
        // console.log(this.info);
      }

      // });
    },
    async getUser(data) {
      const user_id = localStorage.getItem("user_id");
      const res = await this.$axios({
        url: "/user_update/" + user_id,
        method: "post",
        data
      });
      // .then(res => {

      // console.log(res);
      const { statusCode, message } = res.data;
      if (statusCode === 200 && message === "修改成功") {
        this.getInfo();
        this.$toast.success(message);
      }

      // });
    },
    showNickname() {
      this.show1 = true;
      this.nickname = this.info.nickname;
    },
    editNickname() {
      this.getUser({
        nickname: this.nickname
      });
    },
    showPassword() {
      this.show2 = true;
      this.password = this.info.password;
    },
    editPassword() {
      // console.log('修改密码');
      this.getUser({
        password: this.password
      });
    },
    showGender() {
      this.show3 = true;
      this.gender = this.info.gender;
    },
    editGender() {
      this.getUser({
        gender: this.gender
      });
    },
    afterRead(file) {
      // console.log(file);
      this.show4 = true;
      this.img = file.content;
      // const fd = new FormData();
      // fd.append('file', file.file);
      // this.$axios({
      // 	url: '/upload',
      // 	method: 'post',
      // 	data: fd
      // }).then(res => {
      // 	console.log(res);
      // 	const { statusCode, message, data } = res.data;
      // 	if (statusCode === 200 && message === '文件上传成功') {
      // 		this.getUser({
      // 			head_img: data.url
      // 		});
      // 	}
      // });
    },
    cancel() {
      this.show4 = false;
    },
    crop() {
      this.$refs.cropper.getCropBlob(async data => {
        console.log(data); //裁剪后的图片
        const fd = new FormData();
        fd.append("file", data);
        const res = await this.$axios({
          url: "/upload",
          method: "post",
          data: fd
        });
        // .then(res => {

        // console.log(res);
        const { statusCode, data: data1 } = res.data; //data变量与上面的重复了,可以结构赋值重命名
        if (statusCode === 200) {
          this.img = data1.url;
          this.getUser({
            head_img: data1.url
          });
          this.show4 = false;
        }
      });

      // });
    }
    // beforeRead(file) {
    // 	console.log(file);

    // 	if (file.size / 1024 >= 200) {
    // 		this.$toast.fail('图片上传不能超过200k');
    // 		return false;
    // 	}
    // 	if (file.type !== 'image/jpeg') {
    // 		this.$toast.fail('图片上传必须是jpg格式');
    // 		return false;
    // 	}
    // 	return true;
    // }
  }
};
</script>

<style lang="less" scoped>
.hm-avatar {
  position: relative;
  img {
    display: block;
    margin: 20px auto;
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .uploader {
    position: absolute;
    top: 0;
    right: 50%;
    transform: translate(50%);
    opacity: 0;
  }
  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    .cancel {
      position: absolute;
      left: 0;
      z-index: 3;
    }
    .crop {
      position: absolute;
      right: 0;
      z-index: 3;
    }
  }
}
</style>
