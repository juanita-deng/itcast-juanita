<template>
	<div class="hm-collection">
		<hm-header>我的收藏</hm-header>
		<div class="list" v-for="item in list" :key="item.id">
			<div class="left">
				<div class="article">{{ item.title }}</div>
				<div class="bottom">
					<span>{{ item.user.nickname }}</span>
					<span>{{ item.comments.length }}跟帖</span>
				</div>
			</div>
			<div class="right">
				<img :src="item.cover[0].url" alt="" />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			list: []
		};
	},
	async created() {
		const res = await this.$axios.get('/user_star');
		// console.log(res);
		const { statusCode, data } = res.data;
		if (statusCode === 200) {
			this.list = data;
			console.log(this.list);
		}
	}
};
</script>

<style lang="less" scoped>
.list {
	display: flex;
	padding: 10px;
	justify-content: space-between;
	border-bottom: 1px solid #ccc;
	.left {
		flex-direction: column;
		flex: 1;
		display: flex;
		justify-content: space-between;
		.article {
			font-size: 16px;
		}
		.bottom {
			font-size: 12px;
			color: #999;
			& :nth-child(2) {
				margin-left: 12px;
			}
		}
	}
	.right img {
		width: 121px;
		height: 75px;
		display: block;
		object-fit: cover;
	}
}
</style>
