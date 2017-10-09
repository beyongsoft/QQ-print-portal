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

//引用的json可视化插件，使json格式的数据更易解读
import TreeView from "vue-json-tree-view"
Vue.use(TreeView)

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

}
var app=new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App}
})

Vue.http.interceptors.push((request, next) => {//此处this为请求所在页面的Vue实例
    app.$store.state.loading= true
    next((response) => {//在响应之后传给then之前对response进行修改和逻辑判断。对于token时候已过期的判断，就添加在此处，页面中任何一次http请求都会先调用此处方法
        app.$store.state.loading= false
        return response;
    });
});
