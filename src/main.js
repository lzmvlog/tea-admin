import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

import axios from 'axios'
Vue.prototype.$http = axios
// url
axios.defaults.baseURL = 'http://127.0.0.1:8090'
axios.changeOrigin = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
