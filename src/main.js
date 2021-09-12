import Vue from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'

import VueAxios from 'vue-axios'

import ElementUI from 'element-ui';

import './assets/css/style/theme/index.css'
import VueCookies from 'vue-cookies'
import qs from 'qs'

Vue.use(VueCookies)
Vue.use(ElementUI);
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

new Vue({
    router,
    render: function (h) {
        return h(App)
    }
}).$mount('#app')
