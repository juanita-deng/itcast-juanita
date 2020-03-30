<template>
	<div class="tab-manage">
		<hm-header>栏目管理</hm-header>

		<div class="content">
			<div class="list">
				<div class="title">点击删除以下频道(至少保留3个)</div>
				<div
					class="item"
					v-for="item in activeTab"
					:key="item.id"
					@click="del(item.id)"
				>
					{{ item.name }}
				</div>
			</div>

			<div class="list">
				<div class="title">点击添加以下频道</div>
				<div
					class="item"
					v-for="item in deactiveTab"
					:key="item.id"
					@click="add(item.id)"
				>
					{{ item.name }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			activeTab: [],
			deactiveTab: []
		};
	},
	async created() {
		//栏目管理一加载需要先从缓存中获取数据,
		const activeTab = JSON.parse(localStorage.getItem('activeTab'));
		const deactiveTab = JSON.parse(localStorage.getItem('deactiveTab'));
		if (activeTab && deactiveTab) {
			this.activeTab = activeTab;
			this.deactiveTab = deactiveTab;
			return;
		}
		const res = await this.$axios.get('/category');
		// console.log(res);
		const { statusCode, data } = res.data;
		if (statusCode === 200) {
			this.activeTab = data;
			this.deactiveTab = [];
			console.log(this.activeTab);
		}
	},
	methods: {
		del(id) {
			// console.log('要删除的id时', id);
			if (this.activeTab.length <= 3) {
				this.$toast('至少保留3个栏目');
				return;
			}
			const index = this.activeTab.findIndex(v => v.id === id);
			// console.log(index);
			this.deactiveTab.unshift(this.activeTab[index]);
			this.activeTab.splice(index, 1);
		},
		add(id) {
			// console.log('添加的id', id);
			const index = this.deactiveTab.findIndex(v => v.id === id);
			// console.log('添加的下标', index);
			this.activeTab.push(this.deactiveTab[index]);
			this.deactiveTab.splice(index, 1);
		}
	},
	watch: {
		activeTab: {
			handler(value) {
				// console.log('activeTab变化了', value);
				localStorage.setItem('activeTab', JSON.stringify(this.activeTab));
				localStorage.setItem('deactiveTab', JSON.stringify(this.deactiveTab));
			},
			deep: true
		}
	}
};
</script>

<style lang="less" scoped>
.content {
	padding: 0 20px;
	.list {
		overflow: hidden;
		.title {
			padding: 10px 0;
			font-size: 16px;
			color: #999;
			height: 30px;
			line-height: 30px;
		}
		.item {
			float: left;
			padding: 10px 15px;
			background-color: #ddd;
			border: 1px solid #ccc;
			font-size: 12px;
			margin-right: 10px;
			margin-bottom: 10px;
		}
	}
}
</style>
