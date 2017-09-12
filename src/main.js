// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/js/transition.js'
import 'bootstrap/js/collapse.js'
import 'bootstrap/js/button.js'
import '@/assets/less/common.less'
import VueResource from 'vue-resource';
import Validator from 'vue-validator'
import Vuex from 'vuex'
import store from './vuex/store'
import api from './config/api'
Vue.prototype.$api = api

Vue.use(Vuex)
Vue.use(Validator)
Vue.use(VueResource)

Vue.config.productionTip = false
Vue.http.options.emulateJSON = true
    /* eslint-disable no-new */
Vue.prototype.showWarining = function(str) {
    this.$store.state.warningState = true;
    this.$store.state.warningContent = str;
}
Vue.prototype.showSuccess = function(str) {

    this.$store.state.tipState = true;
    this.$store.state.tipContent = str;
    console.log(this.$store.state.tipState)
}
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})