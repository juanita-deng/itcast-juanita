import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import './styles/common.less';
import './styles/iconfont.css';
import 'lib-flexible'; //rem伸缩布局库

//axios处理
import axios from 'axios';
Vue.prototype.$axios = axios;
axios.defaults.baseURL = 'http://localhost:3000';

//vant-ui处理
//按需导入
import { Toast } from 'vant';
Vue.use(Toast);

// -----全局组件----------------
import HmHeader from './components/Hm-Header';
import HmLogo from './components/Hm-Logo';
import HmButton from './components/Hm-Button';
import HmInput from './components/Hm-Input.vue';

Vue.component('hm-header', HmHeader);
Vue.component('hm-logo', HmLogo);
Vue.component('hm-button', HmButton);
Vue.component('hm-input', HmInput);

Vue.config.productionTip = false;
new Vue({
	render: h => h(App),
	router
}).$mount('#app');
