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
			<van-icon
				@click="$router.push('/tab-manage')"
				name="comment-o"
				color="#1989fa"
				size="40"
			/>
			<van-tab :title="item.name" v-for="item in tabList" :key="item.id">
				<!-- 下拉刷新 -->
				<van-pull-refresh v-model="refreshing" @refresh="onrefresh">
					<!-- 上拉加载更多 -->
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
				</van-pull-refresh>
			</van-tab>
		</van-tabs>
	</div>
</template>

<script>
export default {
	name: 'home',
	data() {
		return {
			active: 0,
			tabList: [], //tab栏分类列表
			articleList: [], //tab栏分类下对应的文章列表
			pageSize: 5,
			pageIndex: 1,
			loading: false,
			finished: false,
			refreshing: false,
		};
	},
	async created() {
		console.log('home被创建了');
		//需要先从缓存中获取激活的栏目数据
		const activeTab = JSON.parse(localStorage.getItem('activeTab'));
		if (activeTab) {
			this.tabList = activeTab;
			//默认高亮的tab的数据需要重新渲染
			const id = this.tabList[this.active].id;
			this.getArticleList(id);
			return;
		}
		//如果缓存中没有activeTab,就发送请求,加载所有的栏目
		const res = await this.$axios.get('/category');
		const { statusCode, data } = res.data;
		if (statusCode === 200) {
			// 获取到时所有的分类数据
			this.tabList = data;
			this.getTabList(this.tabList[this.active].id);
		}
	},
	destroyed() {
		console.log('home组件被销毁了');
	},
	//离开home组件会触发
	beforeRouteLeave(to, from, next) {
		console.log(to);

		if (to.name === 'post-detail') {
			this.$store.commit('cache', 'home');
		}
		next();
		this.$store.commit('uncache', 'home');
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
					pageSize: this.pageSize,
				},
			});
			// console.log(res);
			const { statusCode, data } = res.data;
			if (statusCode === 200) {
				if (this.articleList.length > 0 && this.pageIndex === 1) {
					this.articleList = []; //处理频繁切换文章列表报错的问题
				}
				// this.articleList = data;
				this.articleList = [...this.articleList, ...data];
				// console.log(this.articleList);

				this.loading = false;
				this.refreshing = false;

				if (data.length < this.pageSize) {
					this.finished = true;
				}
			}
		},
		onload() {
			// console.log("加载事件");
			const id = this.tabList[this.active].id;
			setTimeout(() => {
				this.pageIndex++;
				this.getArticleList(id);
			}, 1000);
		},
		onrefresh() {
			// console.log("下拉刷新事件");
			//初始化
			this.articleList = [];
			this.pageIndex = 1;
			this.loading = true;
			this.finished = false;

			setTimeout(() => {
				this.refreshing = false;
				this.onload(); //加载高亮的文章详情
			}, 1000);
		},
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
		},
	},
};
</script>

<style lang="less" scoped>
.hm-home {
	position: relative;
	header {
		display: flex;
		height: 30px;
		line-height: 30px;
		padding: 10px;
		background-color: red;
		color: white;

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
	.van-icon {
		position: absolute;
		right: 0;
		z-index: 999;
	}
}
</style>
