<template>
	<div class="hm-user" @click="$emit('clickFn')">
		<div class="left">{{ title }}</div>
		<div class="center">{{ content }}</div>
		<div class="right">
			<span class="iconfont iconjiantou1"></span>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			required: true
		},
		content: String
	}
};
</script>

<style lang="less" scoped>
.hm-user {
	display: flex;
	height: 50px;
	line-height: 50px;
	border-bottom: 1px solid #ccc;
	font-size: 16px;
	margin-left: 20px;
	.center {
		flex: 1;
		text-align: right;
		color: #999;
	}
	.right {
		width: 30px;
		text-align: center;
	}
}
</style>
