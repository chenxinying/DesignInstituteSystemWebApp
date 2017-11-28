// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router'
import store from './vuex'
import { sync } from 'vuex-router-sync'

require('es6-promise').polyfill()

FastClick.attach(document.body)

Vue.config.productionTip = false

const unsync = sync(store, router)

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
