<template>
	<div class="login">
		<hm-header>登录</hm-header>
		<hm-logo></hm-logo>

		<div class="username">
			<input type="text" placeholder="用户名/手机号" />
		</div>
		<div class="password">
			<input type="text" placeholder="密码" />
		</div>

		<hm-button>登录</hm-button>
	</div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.password,
.username {
	margin: 30px;
	input {
		border: none;
		width: 100%;
		outline: none;
		border-bottom: 2px solid #cccccc;
		font-size: 18px;
	}
}
</style>
