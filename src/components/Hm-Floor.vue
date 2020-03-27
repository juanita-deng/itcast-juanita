<template>
	<div class="wrapper">
		<hm-floor
			:floor="floor.parent"
			v-if="floor.parent"
			:count="count - 1"
			@replys="$emit('replys', floor.id, floor.user.nickname)"
		></hm-floor>
		<div class="hm-floor" :class="{ bd: !floor.parent }">
			<div class="title">
				<div class="left">
					{{ count }}楼
					<span> {{ floor.user.nickname }} </span>
				</div>
				<div class="center">
					<span> {{ floor.create_date | date2 }} </span>
				</div>
				<div
					class="right"
					@click="$emit('replys', floor.id, floor.user.nickname)"
				>
					<span>回复</span>
				</div>
			</div>
			<div class="content">
				{{ floor.content }}
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'hm-floor',
	props: {
		floor: Object,
		count: Number
	}
};
</script>

<style lang="less" scoped>
.hm-floor {
	border: 1px solid #000;
	border-top: none;
	background-color: #ddd;
	padding: 0 10px;
	&.bd {
		border-top: 1px solid #000;
	}
	.title {
		padding-top: 20px;
		display: flex;
		.left {
			font-size: 14px;
			span {
				padding: 10px;
			}
		}
		.center {
			flex: 1;
			padding-left: 10px;
			font-size: 12px;
			color: #999;
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
