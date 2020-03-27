<template>
	<div class="hm-comments">
		<div class="title">
			<div class="left">
				<img :src="$axios.defaults.baseURL + comments.user.head_img" alt="" />
			</div>
			<div class="center">
				<div>{{ comments.user.nickname }}</div>
				<div>{{ comments.create_date | date2 }}</div>
			</div>
			<div class="right">
				<span @click="$emit('reply', comments.id, comments.user.nickname)"
					>回复</span
				>
			</div>
		</div>

		<hm-floor
			v-if="comments.parent"
			:floor="comments.parent"
			:count="getFloor(0, comments)"
			@replys="$emit('reply', comments.id, comments.user.nickname)"
		></hm-floor>

		<div class="content">
			{{ comments.content }}
		</div>
	</div>
</template>

<script>
import HmFloor from './Hm-Floor';
export default {
	props: {
		comments: Object
	},
	components: {
		HmFloor
	},
	methods: {
		getFloor(floor, comments) {
			if (comments.parent) {
				return this.getFloor(floor + 1, comments.parent);
			} else {
				return floor;
			}
		}
	}
};
</script>

<style lang="less" scoped>
.hm-comments {
	padding: 0 20px;
	border-bottom: 1px solid #ccc;
	.title {
		padding-top: 20px;
		display: flex;
		.left img {
			width: 35px;
			height: 35px;
			border-radius: 50%;
		}
		.center {
			flex: 1;
			padding-left: 10px;
			& :nth-child(1) {
				font-size: 14px;
			}
			& :nth-child(2) {
				font-size: 12px;
				color: #999;
			}
		}
		.right {
			font-size: 12px;
			color: #999;
		}
	}
	.content {
		padding: 20px 0;
		font-size: 16px;
		word-break: break-all;
	}
}
</style>
