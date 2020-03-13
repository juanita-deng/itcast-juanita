import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import './styles/common.less';
import './styles/iconfont.css';
import 'lib-flexible'; //rem伸缩布局库
import HmHeader from './components/Hm-Header';
import HmLogo from './components/Hm-Logo';
import HmButton from './components/Hm-Button';

Vue.component('hm-header', HmHeader);
Vue.component('hm-logo', HmLogo);
Vue.component('hm-button', HmButton);

new Vue({
	render: h => h(App),
	router
}).$mount('#app');
