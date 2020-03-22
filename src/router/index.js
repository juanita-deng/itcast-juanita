//配置路由信息
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import User from '../pages/User';
import Edit from '../pages/Edit';
import Focus from '../pages/Focus.vue';
import Comments from '../pages/Comments';
import Collection from '../pages/Collection';

const router = new VueRouter({
	routes: [
		{ path: '/', redirect: '/login' },
		{ path: '/login', component: Login, name: 'login' },
		{ path: '/register', component: Register, name: 'register' },
		{ path: '/user', component: User, name: 'user' },
		{ path: '/edit', component: Edit, name: 'edit' },
		{ path: '/focus', component: Focus, name: 'focus' },
		{ path: '/comments', component: Comments, name: 'comments' },
		{ path: '/collection', component: Collection, name: 'collection' }
	]
});

//注册全局的导航守卫
const autoPath = ['/user', '/edit', '/foucs', '/comments', 'collection'];
router.beforeEach(function(to, from, next) {
	const token = localStorage.getItem('token');
	if (autoPath.includes(to.path) && !token) {
		next('/login');
	} else {
		next();
	}
});
export default router;
