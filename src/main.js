import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import './styles/common.less';
import './styles/iconfont.css';
import 'lib-flexible'; //rem伸缩布局库

//vant-ui处理
//按需导入
import {
	Toast,
	Dialog,
	Field,
	Radio,
	RadioGroup,
	cell,
	CellGroup,
	Uploader,
	Button,
	List
} from 'vant';
Vue.use(Toast);
Vue.use(Dialog);
Vue.use(Field);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(cell);
Vue.use(CellGroup);
Vue.use(Uploader);
Vue.use(Button);
Vue.use(List);

//axios处理
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';
axios.interceptors.response.use(res => {
	// console.log(res);
	const { message, statusCode } = res.data;
	if (statusCode === 401 && message === '用户信息验证失败') {
		router.push('/login');
		localStorage.removeItem('token');
		localStorage.removeItem('user.id');
		Toast.fail(message);
	}
	return res;
});
//请求拦截器 设置统一的token
axios.interceptors.request.use(config => {
	const token = localStorage.getItem('token');
	config.headers.Authorization = token;
	return config;
});
Vue.prototype.$axios = axios;

// -----全局组件----------------
import HmHeader from './components/Hm-Header';
import HmLogo from './components/Hm-Logo';
import HmButton from './components/Hm-Button';
import HmInput from './components/Hm-Input.vue';
import HmNavBar from './components/hm-navbar.vue';

Vue.component('hm-header', HmHeader);
Vue.component('hm-logo', HmLogo);
Vue.component('hm-button', HmButton);
Vue.component('hm-input', HmInput);
Vue.component('hm-navbar', HmNavBar);

//--------全局过滤器
import moment from 'moment';
Vue.filter('date', input => moment(input).format('YYYY-MM-DD'));

Vue.config.productionTip = false;
new Vue({
	render: h => h(App),
	router
}).$mount('#app');
