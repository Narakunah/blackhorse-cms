import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(MintUI)

import "./assets/mui/css/mui.css"
import "./assets/mui/css/icons-extra.css"
import VuePreview from 'vue-preview'
 
Vue.use(VuePreview)

import store from "./store"

new Vue({
  el: '#app',
  router,
  render: h => h(App),
  store
})