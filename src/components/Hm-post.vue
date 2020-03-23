<template>
	<div class="hm-post">
		<!-- 视频结构 -->
		<div class="video-img-post" v-if="article.type === 2">
			<div class="list">
				<div class="article">{{ article.title }}</div>
				<div class="center">
					<div class="play">
						<span class="iconfont iconshipin"></span>
					</div>
					<img :src="getUrl(article.cover[0].url)" alt="" />
				</div>
				<div class="bottom">
					<span>{{ article.user.nickname }}</span>
					<span>{{ article.comment_length }}跟帖</span>
				</div>
			</div>
		</div>

		<!-- 单图片结构 -->
		<div class="single-img-post" v-else-if="article.cover.length < 3">
			<div class="list">
				<div class="left">
					<div class="article">{{ article.title }}</div>
					<div class="bottom">
						<span>{{ article.user.nickname }}</span>
						<span>{{ article.comment_length }}跟帖</span>
					</div>
				</div>
				<div class="right">
					<img :src="getUrl(article.cover[0].url)" alt="" />
				</div>
			</div>
		</div>
		<!-- 3张图的结构 -->
		<div class="multiple-img-post" v-else>
			<div class="list">
				<div class="article">{{ article.title }}</div>
				<div class="center">
					<img :src="getUrl(article.cover[0].url)" alt="" />
					<img :src="getUrl(article.cover[1].url)" alt="" />
					<img :src="getUrl(article.cover[2].url)" alt="" />
				</div>

				<div class="bottom">
					<span>{{ article.user.nickname }}</span>
					<span>{{ article.comment_length }}跟帖</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		article: Object
	},
	methods: {
		getUrl(url) {
			//形参
			//处理图片的地址
			if (url.startsWith('http')) {
				return url;
			} else {
				return this.$axios.defaults.baseURL + url;
			}
		}
	}
};
</script>

<style lang="less" scoped>
//3种结构的公共样式
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
//单图片的样式
.single-img-post {
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
		}
		.right img {
			width: 121px;
			height: 75px;
			display: block;
			object-fit: cover;
		}
	}
}
//多图样式
.multiple-img-post {
	display: flex;
	padding: 10px;
	border-bottom: 1px solid #ccc;
	.center {
		& :nth-child(2) {
			padding: 10px 2px;
		}
		img {
			width: 112px;
			height: 74px;
			padding: 10px 0;
			object-fit: cover;
		}
	}
}
//视频样式
.video-img-post {
	padding: 10px;
	display: flex;
	border-bottom: 1px solid #ccc;
	.center {
		position: relative;
		.play {
			width: 46px;
			height: 46px;
			background-color: rgba(0, 0, 0, 0.5);
			border-radius: 50%;
			position: absolute;
			top: 50%;
			right: 50%;
			transform: translate(50%, -50%);
			text-align: center;
			line-height: 46px;
			span {
				color: white;
				font-size: 30px;
			}
		}
		img {
			width: 340px;
			height: 170px;
			object-fit: cover;
			padding: 10px 0;
		}
	}
}
</style>
