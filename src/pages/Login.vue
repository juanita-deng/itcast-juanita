<template>
	<div class="login">
		<hm-header>登录</hm-header>
		<hm-logo></hm-logo>

		<hm-input
			type="text"
			placeholder="用户名/手机号"
			v-model="username"
			:rule="/^1\d{4,10}$/"
			message="用户名不正确"
			ref="username"
		></hm-input>
		<hm-input
			type="password"
			placeholder="密码"
			v-model="password"
			:rule="/^\d{3,12}$/"
			message="密码不正确"
			ref="password"
		></hm-input>

		<hm-button @clickBtn="login">登录</hm-button>

		<div class="go-register">
			没有账号?去<router-link to="/register">注册</router-link>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			username: '',
			password: ''
		};
	},
	created() {
		console.log(this.$route);
		this.username = this.$route.params.username;
		this.password = this.$route.params.password;
	},
	methods: {
		login() {
			console.log('登陆了');
			//先进行校验，校验通过再发送Ajax请求
			const result1 = this.$refs.username.validate(this.username);
			const result2 = this.$refs.password.validate(this.password);
			console.log(result1, result2);
			if (!result1 || !result2) {
				return;
			}

			this.$axios({
				url: '/login',
				method: 'post',
				data: {
					username: this.username,
					password: this.password
				}
			}).then(res => {
				console.log(res);
				const { statusCode, message, data } = res.data;
				if (statusCode === 200) {
					// alert(message);
					this.$toast.success(message);

					//登录状态保持
					localStorage.setItem('token', data.token);
					localStorage.setItem('user_id', data.user.id);

					this.$router.push('/user');
				} else {
					// alert(message);
					this.$toast.fail(message);
				}
			});
		}
	}
};
</script>

<style lang="less" scoped>
.go-register {
	text-align: right;
	font-size: 16px;
	padding: 15px;
	a {
		color: red;
	}
}
</style>
