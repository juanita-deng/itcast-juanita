<template>
	<div class="register">
		<hm-header>注册</hm-header>
		<hm-logo></hm-logo>
		<hm-button @clickBtn="register">注册</hm-button>
	</div>
</template>

<script>
export default {
	methods: {
		register() {
			console.log('注册了');
		}
	}
};
</script>

<style></style>
