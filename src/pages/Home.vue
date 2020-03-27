<template>
	<div class="hm-home">
		<header>
			<div class="left">
				<span class="iconfont iconnew"></span>
			</div>
			<div class="center">
				<span class="iconfont iconsearch" @click="$router.push('/search')"
					>搜索新闻</span
				>
			</div>
			<div class="right">
				<span class="iconfont iconwode" @click="$router.push('/user')"></span>
			</div>
		</header>

		<!-- tab栏 -->
		<van-tabs v-model="active" sticky animated swipeable>
			<van-tab :title="item.name" v-for="item in tabList" :key="item.id">
				<van-list
					v-model="loading"
					@load="onload"
					:immediate-check="false"
					finished-text="没有更多了"
					:finished="finished"
					:offset="50"
				>
					<hm-post
						:article="post"
						v-for="post in articleList"
						:key="post.id"
					></hm-post>
				</van-list>
			</van-tab>
		</van-tabs>
	</div>
</template>

<script>
export default {
	data() {
		return {
			active: 0,
			tabList: [], //tab栏分类列表
			articleList: [], //tab栏分类下对应的文章列表
			pageSize: 5,
			pageIndex: 1,
			loading: false,
			finished: false
		};
	},
	created() {
		this.getTabList();
	},
	methods: {
		async getTabList() {
			const res = await this.$axios.get('/category');
			// console.log(res);
			const { statusCode, data } = res.data;
			if (statusCode === 200) {
				this.tabList = data;
				// console.log(this.tabList);
				this.getArticleList(this.tabList[this.active].id); //默认高亮数据的文章
			}
		},
		async getArticleList(id) {
			// console.log('需要获取id为', id, '的tab数据下的文章');
			const res = await this.$axios.get('/post', {
				//.需要传参获取tab栏数的列表的id
				params: {
					category: id,
					pageIndex: this.pageIndex,
					pageSize: this.pageSize
				}
			});
			// console.log(res);
			const { statusCode, data } = res.data;
			if (statusCode === 200) {
				if (this.articleList.length > 0 && this.pageIndex === 1) {
					this.articleList = []; //处理频繁切换文章列表报错的问题
				}
				// this.articleList = data;
				this.articleList = [...this.articleList, ...data];
				console.log(this.articleList);

				this.loading = false;

				if (data.length < this.pageSize) {
					this.finished = true;
				}
			}
		},
		onload() {
			console.log('加载事件');
			const id = this.tabList[this.active].id;
			setTimeout(() => {
				this.pageIndex++;
				this.getArticleList(id);
			}, 1000);
		}
	},
	watch: {
		active(value) {
			//切换tab列表时需要监听对应文章列表的id
			// console.log('监听到active变化了', value);

			this.articleList = [];
			this.pageIndex = 1;
			this.finished = false;
			this.loading = true;
			const id = this.tabList[value].id; //切换tab栏高亮的id
			setTimeout(() => {
				this.getArticleList(id);
			}, 1000);
		}
	}
};
</script>

<style lang="less" scoped>
.hm-home {
	// position: relative;
	header {
		display: flex;
		height: 30px;
		line-height: 30px;
		padding: 10px;
		background-color: red;
		color: white;
		// position: fixed;
		// margin-top: 10px;
		// z-index: 99;
		.left span {
			font-size: 50px;
		}
		.center {
			flex: 1;
			text-align: center;
			background-color: rgba(255, 255, 255, 0.5);
			border-radius: 30px;
			margin: 0 20px;
		}
	}
	//深度作用选择器,解决scoped问题,覆盖第三方库的样式
	/deep/.van-tabs__nav {
		background-color: #ddd;
	}
}
</style>
