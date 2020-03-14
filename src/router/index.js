//配置路由信息
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import User from '../pages/User';

const router = new VueRouter({
	routes: [
		{ path: '/', redirect: '/login' },
		{ path: '/login', component: Login },
		{ path: '/register', component: Register },
		{ path: '/user', component: User }
	]
});

export default router;
