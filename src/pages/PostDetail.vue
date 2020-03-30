<template>
	<div class="post-detail" :class="isShow ? 'pb50' : 'pb150'">
		<header>
			<div class="left" @click="$router.back()">
				<span class="iconfont iconjiantou2"></span>
			</div>
			<div class="center">
				<span class="iconfont iconnew"></span>
			</div>
			<div class="right">
				<span
					class="followed"
					v-if="detail.has_follow"
					@click="cancelFollowed(detail.user.id)"
					>已关注</span
				>
				<span class="unfollow" v-else @click="follow(detail.user.id)"
					>关注</span
				>
			</div>
		</header>

		<div class="article-title">
			<h5 class="title">{{ detail.title }}</h5>
			<div class="bottom">
				<span> {{ detail.user.nickname }} </span>
				<span> {{ detail.create_date | date }} </span>
			</div>
		</div>

		<div class="article-content">
			<span v-html="detail.content" v-if="detail.type === 1"></span>
			<video v-else :src="detail.content" controls muted></video>
		</div>

		<div class="like">
			<div class="left" @click="like" :class="{ active: detail.has_like }">
				<span class="iconfont icondianzan"></span>
				<span>{{ detail.like_length }}</span>
			</div>
			<div class="right">
				<span class="iconfont iconweixin"></span>
				<span>微信</span>
			</div>
		</div>

		<div class="hm-comments">
			<h5>精彩评论</h5>
			<hm-comments
				v-for="comments in commentList"
				:key="comments.id"
				:comments="comments"
				@reply="reply"
			></hm-comments>
		</div>

		<footer>
			<div class="input" v-if="isShow">
				<input type="text" placeholder="写跟贴" @click="handleFocus" />
				<span class="iconfont iconpinglun-">
					<span>{{ detail.comment_length }}</span>
				</span>
				<span
					class="iconfont iconshoucang"
					:class="{ active: detail.has_star }"
					@click="star"
				></span>
				<span class="iconfont iconfenxiang"></span>
			</div>

			<div class="textarea" v-else>
				<textarea
					:placeholder="'回复:' + replyNickname"
					ref="textarea"
					@blur="handerBlur"
					v-model="content"
				></textarea>
				<span @click="addComments">发送</span>
			</div>
		</footer>
	</div>
</template>

<script>
export default {
	data() {
		return {
			detail: { user: '' },
			isShow: true,
			commentList: '',
			replyId: '',
			replyNickname: '',
			content: ''
		};
	},
	created() {
		this.getDetail();
		this.getComments();

		// this.$bus.$on('replys', async (id, nickname) => {
		// 	//方法二:非父子通讯公交车
		// 	console.log('从孙子组件floor接收到的评论的数据是', id, nickname);
		// 	this.replyId = id;
		// 	this.replyNickname = nickname;
		// 	this.isShow = false;
		// 	await this.$nextTick();
		// 	this.$refs.textarea.focus();
		// });
	},
	methods: {
		async getDetail() {
			const id = this.$route.params.id;
			const res = await this.$axios.get('/post/' + id);
			// console.log(res);
			const { statusCode, message, data } = res.data;
			if (statusCode === 200) {
				this.detail = data;
				// console.log(this.detail);
			}
		},
		async getComments() {
			const id = this.$route.params.id;
			const res = await this.$axios.get('/post_comment/' + id);
			// console.log(res);
			const { statusCode, message, data } = res.data;
			if (statusCode === 200) {
				this.commentList = data;
				// console.log(this.commentList);
			}
		},
		async cancelFollowed(id) {
			const res = await this.$axios.get('/user_unfollow/' + id);
			// console.log(res);
			const { statusCode, message } = res.data;
			if (statusCode === 200) {
				this.$toast.success('取关成功');
				// this.detail.has_follow = false;
				this.getDetail();
			}
		},
		async follow(id) {
			const token = localStorage.getItem('token');
			if (!token) {
				this.$router.push({
					name: 'login',
					params: {
						back: true
					}
				});
				this.$toast('请先登陆');
				return;
			}
			const res = await this.$axios.get('/user_follows/' + id);
			// console.log(res);
			const { statusCode, message } = res.data;
			if (statusCode === 200) {
				this.$toast.success(message);
				this.detail.has_follow = true;
			}
		},
		async like() {
			const token = localStorage.getItem('token');
			if (!token) {
				this.$router.push({
					name: 'login',
					params: {
						back: true
					}
				});
				this.$toast('请先登陆');
				return;
			}
			const res = await this.$axios.get('/post_like/' + this.detail.id);
			// console.log(res);
			const { statusCode, message } = res.data;
			if (statusCode === 200) {
				this.$toast.success(message);
				this.getDetail();
			}
		},
		async star() {
			const token = localStorage.getItem('token');
			if (!token) {
				this.$router.push({
					name: 'login',
					params: {
						back: true
					}
				});
				this.$toast('请先登陆');
				return;
			}
			const res = await this.$axios.get('/post_star/' + this.detail.id);
			// console.log(res);
			const { statusCode, message } = res.data;
			if (statusCode === 200) {
				this.$toast.success(message);
				this.getDetail();
			}
		},
		async handleFocus() {
			this.isShow = false;
			// this.$refs.textarea.focus();//error

			await this.$nextTick();
			this.$refs.textarea.focus();
		},
		handerBlur() {
			if (!this.content) {
				this.isShow = true;
				this.replyNickname = '';
				this.replyId = '';
			}
		},
		async reply(id, nickname) {
			//方法一:孙传爷
			// console.log('从子组件接收到的评论的id是', id);
			this.replyId = id;
			this.replyNickname = nickname;
			this.isShow = false;
			await this.$nextTick();
			this.$refs.textarea.focus();
		},
		async addComments() {
			const id = this.$route.params.id;
			const res = await this.$axios({
				url: '/post_comment/' + id,
				method: 'post',
				data: {
					content: this.content,
					parent_id: this.replyId
				}
			});
			// console.log(res);
			const { statusCode, message, data } = res.data;
			if (statusCode === 200) {
				this.$toast.success(message);
				this.isShow = true;
				this.content = '';
				this.replyId = '';
				this.getComments();
				this.getDetail();
			}
		}
	}
};
</script>

<style lang="less" scoped>
.pb150 {
	padding-bottom: 150px;
}
.pb50 {
	padding-bottom: 50px;
}
.post-detail {
	header {
		padding: 0 20px;
		display: flex;
		height: 50px;
		line-height: 50px;
		justify-content: space-between;
		align-items: center;
		.center {
			height: 50px;
			line-height: 50px;
			flex: 1;
			padding: 0 10px;
			span {
				font-size: 50px;
			}
		}
		.right {
			span {
				height: 30px;
				line-height: 30px;
				font-size: 12px;
				border: 1px solid #ccc;
				color: #999;
				border-radius: 15px;
				padding: 2px 10px;
			}
			.unfollow {
				padding: 5px 15px;
				border: none;
				background-color: red;
				color: white;
			}
		}
	}
	.active {
		color: red;
	}
	.article-title {
		padding: 0 20px;
		.title {
			font-size: 18px;
		}
		.bottom {
			font-size: 14px;
			color: #999;
			padding: 10px 0;
			& :nth-of-type(2) {
				padding-left: 12px;
			}
		}
	}
	.article-content {
		padding: 0 20px;
		span {
			font-size: 12px;
		}
		/deep/ p {
			text-indent: 16px;
		}
		/deep/ img {
			display: block;
			margin: 0 auto;
			width: 100%;
		}
		/deep/ video {
			width: 100%;
		}
	}
	.like {
		display: flex;
		justify-content: space-around;
		border-bottom: 3px solid #ddd;
		padding: 0 20px;
		div {
			width: 80px;
			height: 30px;
			border: 1px solid #ccc;
			border-radius: 15px;
			text-align: center;
			line-height: 30px;
			font-size: 14px;
			margin: 20px;
		}
		.right {
			& :nth-child(1) {
				color: #00c800;
			}
		}
	}
	.hm-comments {
		h5 {
			margin-top: 20px;
			text-align: center;
			font-size: 16px;
		}
	}
	footer {
		position: fixed;
		bottom: 0;
		width: 100%;
		background-color: #fff;
		padding: 10px 0;
		.input {
			display: flex;
			justify-content: space-around;
			align-items: center;
			font-size: 12px;
			input {
				width: 180px;
				height: 30px;
				background-color: #ddd;
				border-radius: 30px;
				border: none;
				outline: none;
				text-indent: 14px;
			}
			span {
				font-size: 20px;
			}
			.iconpinglun- {
				position: relative;
				span {
					position: absolute;
					top: -7px;
					right: -6px;
					padding: 0 3px;
					border-radius: 5px;
					font-size: 10px;
					color: white;
					background-color: red;
				}
			}
		}
		.textarea {
			padding: 0 20px;
			display: flex;
			align-items: flex-end;
			textarea {
				flex: 1;
				height: 80px;
				background-color: #ddd;
				border: none;
				outline: none;
				border-radius: 10px;
				font-size: 12px;
				padding: 10px;
			}
			span {
				width: 60px;
				height: 30px;
				line-height: 30px;
				text-align: center;
				border-radius: 30px;
				background-color: red;
				color: white;
				font-size: 14px;
				margin-left: 15px;
			}
		}
	}
}
</style>
