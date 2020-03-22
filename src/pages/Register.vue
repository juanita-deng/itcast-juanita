<template>
	<div class="register">
		<hm-header>注册</hm-header>
		<hm-logo></hm-logo>
		<hm-input
			placeholder="用户名/手机号"
			v-model="username"
			:rule="/^1\d{4,10}$/"
			message="用户名是5~11位数字"
			ref="username"
		></hm-input>
		<hm-input
			placeholder="昵称"
			v-model="nickname"
			:rule="/^[\u4e00-\u9fa5]{3,7}$/"
			message="昵称是3~7位中文"
			ref="nickname"
		></hm-input>
		<hm-input
			placeholder="密码"
			v-model="password"
			type="password"
			:rule="/^\d{3,12}$/"
			message="密码是3~10位数字"
			ref="password"
		></hm-input>
		<hm-button @clickBtn="register">注册</hm-button>
		<div class="go-login">
			已有账号?去<router-link to="/login">登录</router-link>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			username: '',
			nickname: '',
			password: ''
		};
	},
	methods: {
		async register() {
			console.log('注册了');
			//表单验证成功就去发送ajax请求
			const result1 = this.$refs.username.validate(this.username);
			const result2 = this.$refs.nickname.validate(this.nickname);
			const result3 = this.$refs.password.validate(this.password);
			if (!result1 || !result2 || !result3) {
				return;
			}
			const res = await this.$axios({
				url: '/register',
				method: 'post',
				data: {
					username: this.username,
					password: this.password,
					nickname: this.nickname
				}
			});
			// .then(res => {

			console.log(res.data);
			if (res.data.statusCode === 200) {
				this.$toast.success(res.data.message);
				this.$router.push({
					name: 'login',
					params: {
						username: this.username,
						password: this.password
					}
				});
			} else {
				this.$toast.fail(res.data.message);
			}

			// });
		}
	}
};
</script>

<style lang="less" scoped>
.go-login {
	text-align: right;
	font-size: 16px;
	padding: 15px;
	a {
		color: red;
	}
}
</style>
