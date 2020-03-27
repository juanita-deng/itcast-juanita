<template>
	<div class="hm-comments">
		<hm-header>我的跟帖</hm-header>
		<van-list
			v-model="loading"
			@load="onload"
			:finished="finished"
			:finished-check="false"
			finished-text="没有更多了"
			:offset="50"
		>
			<div class="list" v-for="item in list" :key="item.id">
				<div class="time">
					<span>{{ item.create_date }}</span>
				</div>

				<!-- 动态生成 -->
				<div class="content" v-if="item.parent">
					<div>回复：{{ item.parent.user.nickname }}</div>
					<div>{{ item.parent.content }}</div>
				</div>

				<div class="comments">
					{{ item.content }}
				</div>
				<div
					class="article"
					@click="$router.push(`/post-detail/${item.post.id}`)"
				>
					<span>原文:{{ item.post.title }} </span>
					<span class="iconfont iconjiantou1"></span>
				</div>
			</div>
		</van-list>
	</div>
</template>

<script>
export default {
	data() {
		return {
			list: [],
			loading: false,
			finished: false,
			pageIndex: 1, //当前页
			pageSize: 5 //每页条数
		};
	},
	created() {
		this.getList();
	},
	methods: {
		async getList() {
			const res = await this.$axios({
				url: '/user_comments',
				method: 'get',
				params: {
					pageIndex: this.pageIndex,
					pageSize: this.pageSize
				}
			});
			// .then(res => {

			// console.log(res);
			const { statusCode, data } = res.data;
			if (statusCode === 200) {
				// this.list = data;
				this.list = [...this.list, ...data]; //合并数组
				// console.log(this.list);

				//  当数据加载完成了,记得让loading改成false,
				//  不然无法触发下一次的加载
				this.loading = false;

				//判断是否还有更多数据
				if (data.length < this.pageSize) {
					this.finished = true; //没有更多数据
				}
			}

			// });
		},
		onload() {
			// console.log('我触底了，我要加载更多数据了');
			this.pageIndex++;
			this.getList();
		}
	}
};
</script>

<style lang="less" scoped>
.list {
	border-bottom: 1px solid #ccc;
	padding: 20px;
	.time {
		height: 30px;
		line-height: 30px;
		font-size: 16px;
		color: #999;
	}
	.content {
		background-color: #dddddd;
		padding: 10px;
		div {
			padding: 10px 0;
			color: #666;
			font-size: 14px;
			word-break: break-all;
		}
	}
	.comments,
	.article {
		padding: 10px 0;
		font-size: 16px;
		display: flex;
		word-break: break-all;
	}
	.article {
		& :nth-child(1) {
			flex: 1;
			color: #999;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
}
</style>
