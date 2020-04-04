import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
	//提供状态
	state: {
		cacheList: [],
	},
	//提供计算属性
	mutations: {
		//需要缓存
		cache(state, name) {
			//name传递过来的name为home的组件
			if (!state.cacheList.includes(name)) {
				state.cacheList.push(name);
			}
		},
		//不需要缓存
		uncache(state, name) {
			if (state.cacheList.includes(name)) {
				state.cacheList = state.cacheList.filter((v) => v !== name);
			}
		},
	},
});
export default store;
