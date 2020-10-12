import Vue from 'vue'
import App from './App'
import store from "./store/index.js"

import mock from "./mock/index.js";
mock.mockXHR();

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
