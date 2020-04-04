//配置路由信息
import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

Vue.use(VueRouter);
//同步导入
// import Login from '../pages/Login.vue';
// import Register from '../pages/Register.vue';
// import User from '../pages/User';
// import Edit from '../pages/Edit';
// import Focus from '../pages/Focus.vue';
// import Comments from '../pages/Comments';
// import Collection from '../pages/Collection';
// import Home from '../pages/Home';
// import Search from '../pages/Search';
// import postDetail from '../pages/PostDetail.vue';
// import tabManage from '../pages/TabManage.vue';
//异步导入
//打包到个人模块
const Login = () => import(/* webpackChunkName:"user" */ '../pages/Login.vue');
const Register = () =>
	import(/* webpackChunkName:"user" */ '../pages/Register.vue');
const User = () => import(/* webpackChunkName:"user" */ '../pages/User');
const Edit = () => import(/* webpackChunkName:"user" */ '../pages/Edit');
const Focus = () => import(/* webpackChunkName:"user" */ '../pages/Focus.vue');
const Comments = () =>
	import(/* webpackChunkName:"user" */ '../pages/Comments');
const Collection = () =>
	import(/* webpackChunkName:"user" */ '../pages/Collection');

//打包到首页模块
const Home = () => import(/* webpackChunkName:"home" */ '../pages/Home');
const Search = () => import(/* webpackChunkName:"home" */ '../pages/Search');
const postDetail = () =>
	import(/* webpackChunkName:"home" */ '../pages/PostDetail.vue');
const tabManage = () =>
	import(/* webpackChunkName:"home" */ '../pages/TabManage.vue');
const router = new VueRouter({
	routes: [
		// { path: '/', redirect: '/login' },
		{ path: '/', component: Home, name: 'home' },
		{ path: '/login', component: Login, name: 'login' },
		{ path: '/register', component: Register, name: 'register' },
		{ path: '/user', component: User, name: 'user' },
		{ path: '/edit', component: Edit, name: 'edit' },
		{ path: '/focus', component: Focus, name: 'focus' },
		{ path: '/comments', component: Comments, name: 'comments' },
		{ path: '/collection', component: Collection, name: 'collection' },
		{ path: '/search', component: Search, name: 'search' },
		{ path: '/post-detail/:id', component: postDetail, name: 'post-detail' },
		{ path: '/tab-manage', component: tabManage, name: 'tab-manage' },
	],
});

//注册全局的导航守卫
const autoPath = ['/user', '/edit', '/foucs', '/comments', 'collection'];
router.beforeEach(function (to, from, next) {
	if (to.name === 'home') {
		store.commit('cache', 'home');
	}
	const token = localStorage.getItem('token');
	if (autoPath.includes(to.path) && !token) {
		// next('/login');
		router.push('/login').catch((err) => err);
	} else {
		next();
	}
});
export default router;
