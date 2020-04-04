<template>
	<div>
		<keep-alive :include="cacheList">
			<router-view></router-view>
		</keep-alive>
	</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
	//因多组件需要用到catchlist,则提供一个计算属性
	computed: {
		...mapState(['cacheList']),
	},
};
</script>

<style></style>
