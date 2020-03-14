<template>
	<div class="hm-button" @click="$emit('clickBtn')">
		<slot></slot>
	</div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.hm-button {
	margin: 20px;
	height: 50px;
	line-height: 50px;
	border-radius: 25px;
	background-color: #d93e00;
	color: #fff;
	text-align: center;
	font-size: 18px;
}
</style>
