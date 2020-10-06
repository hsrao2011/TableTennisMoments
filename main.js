import Vue from 'vue'
import App from './App'

var mock = require("./mock/index.js")

mock.mockXHR();

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
