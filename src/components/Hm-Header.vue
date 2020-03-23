<template>
	<div class="hm-container">
		<div class="hm-header">
			<div
				class="header-left iconfont iconjiantou2"
				@click="$router.go(-1)"
			></div>
			<h3 class="title">
				<slot></slot>
			</h3>
			<div class="header-right"></div>
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.hm-container {
	height: 40px;
	.hm-header {
		position: fixed;
		width: 100%;
		background-color: #fff;
		z-index: 99;
		display: flex;
		height: 40px;
		line-height: 40px;
		border-bottom: 1px solid #ccc;
		.header-left,
		.header-right {
			width: 40px;
			text-align: center;
			font-weight: 700;
		}
		.title {
			flex: 1;
			text-align: center;
			font-size: 18px;
		}
	}
}
</style>
