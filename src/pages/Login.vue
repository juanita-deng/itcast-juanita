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
		></hm-input>
		<hm-input
			type="password"
			placeholder="密码"
			v-model="password"
			:rule="/^\d{3,12}$/"
			message="密码不正确"
		></hm-input>

		<hm-button @clickBtn="login">登录</hm-button>
	</div>
</template>

<script>
export default {
	methods: {
		login() {
			console.log('登陆了');

			this.$axios({
				url: '/login',
				method: 'post',
				data: {
					username: this.username,
					password: this.password
				}
			}).then(res => {
				console.log(res);
				if (res.data.statusCode === 200) {
					alert(res.data.message);
					this.$router.push('/user');
				} else {
					alert(res.data.message);
				}
			});
		}
	},
	data() {
		return {
			username: '',
			password: ''
		};
	}
};
</script>

<style lang="less" scoped></style>
